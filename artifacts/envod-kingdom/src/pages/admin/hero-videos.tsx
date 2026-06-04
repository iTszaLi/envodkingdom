import React, { useRef, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListHeroVideos } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListHeroVideosQueryKey } from "@workspace/api-client-react";
import { Film, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const SECTION_ORDER = ["crane", "air", "warehouse"] as const;

type UploadState = "idle" | "uploading" | "success" | "error";

interface SectionUploadState {
  state: UploadState;
  message?: string;
  progress?: number;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function AdminHeroVideos() {
  const { data: sections, isLoading } = useListHeroVideos();
  const queryClient = useQueryClient();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [uploadStates, setUploadStates] = useState<Record<string, SectionUploadState>>({});

  const setUploadState = (key: string, state: SectionUploadState) => {
    setUploadStates((prev) => ({ ...prev, [key]: state }));
  };

  const handleFileChange = async (section: string, file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".webp")) {
      setUploadState(section, { state: "error", message: "Only animated .webp files are accepted." });
      return;
    }

    setUploadState(section, { state: "uploading", message: "Extracting frames…" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE}/api/hero-videos/${section}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        setUploadState(section, { state: "error", message: err.error ?? "Upload failed." });
        return;
      }

      const updated = await res.json();
      setUploadState(section, {
        state: "success",
        message: `Done — ${updated.frameCount} frames extracted.`,
      });

      queryClient.invalidateQueries({ queryKey: getListHeroVideosQueryKey() });
    } catch (e) {
      setUploadState(section, { state: "error", message: "Network error. Please try again." });
    }
  };

  const orderedSections = sections
    ? SECTION_ORDER.map((key) => sections.find((s) => s.key === key)).filter(Boolean)
    : [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hero Video Manager</h1>
        <p className="text-muted-foreground">
          Replace the three cinematic background videos on the homepage. Upload an animated WebP file for each section.
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading section info…
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {orderedSections.map((section) => {
          if (!section) return null;
          const upload = uploadStates[section.key] ?? { state: "idle" };
          const isUploading = upload.state === "uploading";
          const thumbnailUrl = `${BASE}${section.thumbnailUrl}?t=${section.updatedAt}`;

          return (
            <div
              key={section.key}
              className="bg-card border border-white/5 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-primary/20">
                <img
                  src={thumbnailUrl}
                  alt={section.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-white text-xs font-semibold uppercase tracking-wide line-clamp-2">
                      {section.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Frames</p>
                    <p className="text-xl font-bold text-white">{section.frameCount}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                    <p className="text-xs text-white font-medium">
                      {new Date(section.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Status */}
                {upload.state !== "idle" && (
                  <div
                    className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm ${
                      upload.state === "success"
                        ? "bg-green-500/10 text-green-400"
                        : upload.state === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {upload.state === "uploading" && (
                      <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 mt-0.5" />
                    )}
                    {upload.state === "success" && (
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    )}
                    {upload.state === "error" && (
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{upload.message}</span>
                  </div>
                )}

                {/* Upload button */}
                <button
                  disabled={isUploading}
                  onClick={() => {
                    setUploadState(section.key, { state: "idle" });
                    fileInputRefs.current[section.key]?.click();
                  }}
                  className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium transition-colors
                    bg-secondary hover:bg-secondary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {isUploading ? "Processing…" : "Replace Video"}
                </button>

                <input
                  type="file"
                  accept=".webp,image/webp"
                  className="hidden"
                  ref={(el) => { fileInputRefs.current[section.key] = el; }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange(section.key, file);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-5 bg-card border border-white/5 rounded-xl">
        <h2 className="text-sm font-semibold text-white mb-3">How it works</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Click <strong className="text-white">Replace Video</strong> on any section and choose an animated WebP file.</li>
          <li>The server extracts ~120 JPEG frames from the WebP and replaces the existing ones on disk.</li>
          <li>The homepage automatically picks up the new frames on next page load — no restart needed.</li>
          <li>Thumbnail previews on this page refresh after each upload to confirm the change.</li>
        </ol>
      </div>
    </AdminLayout>
  );
}
