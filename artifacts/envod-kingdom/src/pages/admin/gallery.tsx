import React, { useEffect, useMemo, useRef, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListGallery,
  useUpdateGalleryItem,
  useDeleteGalleryItem,
  useReorderGallery,
  getListGalleryQueryKey,
} from "@workspace/api-client-react";
import type { GalleryItem } from "@workspace/api-client-react";
import {
  Upload,
  Loader2,
  Trash2,
  Save,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Images,
} from "lucide-react";
import { UPLOAD_CATEGORIES, defaultSrc } from "@/lib/gallery";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type UploadState = "idle" | "uploading" | "success" | "error";

interface Draft {
  title: string;
  titleAr: string;
  category: string;
  location: string;
  locationAr: string;
  monthYear: string;
  altText: string;
  description: string;
  descriptionAr: string;
  isPublished: boolean;
}

function toDraft(item: GalleryItem): Draft {
  return {
    title: item.title ?? "",
    titleAr: item.titleAr ?? "",
    category: item.category ?? "operations",
    location: item.location ?? "",
    locationAr: item.locationAr ?? "",
    monthYear: item.monthYear ?? "",
    altText: item.altText ?? "",
    description: item.description ?? "",
    descriptionAr: item.descriptionAr ?? "",
    isPublished: item.isPublished,
  };
}

export default function AdminGallery() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useListGallery({});
  const updateItem = useUpdateGalleryItem();
  const deleteItem = useDeleteGalleryItem();
  const reorder = useReorderGallery();

  const items = useMemo(
    () => [...(data ?? [])].sort((a, b) => a.sortOrder - b.sortOrder || b.id - a.id),
    [data],
  );

  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [uploadCategory, setUploadCategory] = useState("operations");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [savedId, setSavedId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Seed drafts for any newly loaded items without clobbering in-progress edits
  useEffect(() => {
    if (!data) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const item of data) {
        if (!next[item.id]) next[item.id] = toDraft(item);
      }
      return next;
    });
  }, [data]);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getListGalleryQueryKey({}) });
    queryClient.invalidateQueries({ queryKey: getListGalleryQueryKey({ published: true }) });
  };

  const updateDraft = (id: number, patch: Partial<Draft>) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const fd = new FormData();
    Array.from(fileList).forEach((f) => fd.append("files", f));
    fd.append("category", uploadCategory);

    setUploadState("uploading");
    setUploadMessage(`Uploading & optimizing ${fileList.length} image(s)…`);
    try {
      const res = await fetch(`${BASE}/api/gallery/upload`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Upload failed" }));
        setUploadState("error");
        setUploadMessage(err.error ?? "Upload failed.");
        return;
      }
      const body = (await res.json()) as { created: GalleryItem[]; skipped: string[] };
      setUploadState("success");
      setUploadMessage(
        `Added ${body.created.length} image(s)${body.skipped.length ? `, skipped ${body.skipped.length}` : ""}.`,
      );
      invalidate();
    } catch {
      setUploadState("error");
      setUploadMessage("Network error while uploading.");
    }
  };

  const handleSave = (id: number) => {
    const draft = drafts[id];
    if (!draft) return;
    updateItem.mutate(
      {
        id,
        data: {
          title: draft.title,
          titleAr: draft.titleAr,
          category: draft.category,
          location: draft.location,
          locationAr: draft.locationAr,
          monthYear: draft.monthYear,
          altText: draft.altText,
          description: draft.description,
          descriptionAr: draft.descriptionAr,
          isPublished: draft.isPublished,
        },
      },
      {
        onSuccess: () => {
          setSavedId(id);
          setTimeout(() => setSavedId((cur) => (cur === id ? null : cur)), 2000);
          invalidate();
        },
      },
    );
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this image permanently? This cannot be undone.")) return;
    deleteItem.mutate({ id }, { onSuccess: invalidate });
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const reordered = [...items];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    reorder.mutate({ data: { ids: reordered.map((i) => i.id) } }, { onSuccess: invalidate });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Images className="w-7 h-7 text-secondary" />
          Gallery Manager
        </h1>
        <p className="text-muted-foreground">
          Upload operation photos, edit their details, reorder, and control what appears on the public gallery.
          Images are optimized into responsive WebP automatically.
        </p>
      </div>

      {/* Upload panel */}
      <div className="bg-card border border-white/5 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <label className="text-sm text-white font-medium">
            Category for upload
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="ml-3 bg-background border border-white/10 rounded-md px-3 py-2 text-sm text-white"
            >
              {UPLOAD_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.en}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
            dragActive ? "border-secondary bg-secondary/5" : "border-white/15 hover:border-secondary/50"
          }`}
        >
          {uploadState === "uploading" ? (
            <Loader2 className="w-8 h-8 text-secondary animate-spin mx-auto mb-3" />
          ) : (
            <Upload className="w-8 h-8 text-secondary mx-auto mb-3" />
          )}
          <p className="text-white font-medium">Drop images here or click to browse</p>
          <p className="text-muted-foreground text-sm mt-1">JPG, PNG or WebP — you can select many at once (max 30MB each)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {uploadState !== "idle" && uploadState !== "uploading" && (
          <div
            className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
              uploadState === "success" ? "bg-green-500/10 text-green-400" : "bg-destructive/10 text-destructive"
            }`}
          >
            {uploadState === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {uploadMessage}
          </div>
        )}
        {uploadState === "uploading" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm bg-secondary/10 text-secondary">
            <Loader2 className="w-4 h-4 animate-spin" />
            {uploadMessage}
          </div>
        )}
      </div>

      {/* Items */}
      {isLoading ? (
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading gallery…
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border border-dashed border-white/10 rounded-xl">
          No images yet. Upload your first operation photos above.
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">{items.length} image(s)</p>
          {items.map((item, index) => {
            const draft = drafts[item.id] ?? toDraft(item);
            return (
              <div
                key={item.id}
                className="bg-card border border-white/5 rounded-xl p-5 flex flex-col lg:flex-row gap-5"
              >
                {/* Thumbnail + order */}
                <div className="flex gap-3 lg:flex-col lg:items-center">
                  <img
                    src={defaultSrc(item, 480)}
                    alt={item.altText || item.title}
                    className="w-28 h-28 object-cover rounded-lg bg-background flex-shrink-0"
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  />
                  <div className="flex lg:flex-col gap-1">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0 || reorder.isPending}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === items.length - 1 || reorder.isPending}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Title">
                    <input
                      value={draft.title}
                      onChange={(e) => updateDraft(item.id, { title: e.target.value })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Title (Arabic)">
                    <input
                      value={draft.titleAr}
                      onChange={(e) => updateDraft(item.id, { titleAr: e.target.value })}
                      dir="rtl"
                      placeholder="اتركه فارغاً لاستخدام الإنجليزية"
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Category">
                    <select
                      value={draft.category}
                      onChange={(e) => updateDraft(item.id, { category: e.target.value })}
                      className="admin-input"
                    >
                      {UPLOAD_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.en}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Location">
                    <input
                      value={draft.location}
                      onChange={(e) => updateDraft(item.id, { location: e.target.value })}
                      placeholder="e.g. Jeddah Islamic Port"
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Location (Arabic)">
                    <input
                      value={draft.locationAr}
                      onChange={(e) => updateDraft(item.id, { locationAr: e.target.value })}
                      dir="rtl"
                      placeholder="اتركه فارغاً لاستخدام الإنجليزية"
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Month / Year (YYYY-MM)">
                    <input
                      value={draft.monthYear}
                      onChange={(e) => updateDraft(item.id, { monthYear: e.target.value })}
                      placeholder="2026-03"
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Alt text (SEO)">
                    <input
                      value={draft.altText}
                      onChange={(e) => updateDraft(item.id, { altText: e.target.value })}
                      placeholder="Describe the image for search & accessibility"
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Description">
                    <input
                      value={draft.description}
                      onChange={(e) => updateDraft(item.id, { description: e.target.value })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="Description (Arabic)">
                    <input
                      value={draft.descriptionAr}
                      onChange={(e) => updateDraft(item.id, { descriptionAr: e.target.value })}
                      dir="rtl"
                      placeholder="اتركه فارغاً لاستخدام الإنجليزية"
                      className="admin-input"
                    />
                  </Field>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => updateDraft(item.id, { isPublished: !draft.isPublished })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        draft.isPublished
                          ? "bg-green-500/15 text-green-400"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {draft.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      {draft.isPublished ? "Published" : "Hidden"}
                    </button>

                    <button
                      onClick={() => handleSave(item.id)}
                      disabled={updateItem.isPending}
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/90 text-white text-sm font-medium disabled:opacity-50"
                    >
                      {savedId === item.id ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {savedId === item.id ? "Saved" : "Save"}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteItem.isPending}
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-medium disabled:opacity-50 ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground mb-1 block">{label}</span>
      {children}
    </label>
  );
}
