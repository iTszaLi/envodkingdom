import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AnimChapter {
  startProgress: number;
  endProgress: number;
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
}

interface Props {
  frameFolder: string;
  frameCount: number;
  chapters: AnimChapter[];
  isRtl?: boolean;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const FPS = 10;
const INTERVAL_MS = 1000 / FPS;

function pad(n: number) {
  return n.toString().padStart(4, "0");
}

function renderFrameToCanvas(
  idx: number,
  images: HTMLImageElement[],
  canvas: HTMLCanvasElement,
) {
  const img = images[idx];
  if (!img?.complete || img.naturalWidth === 0) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

export function ScrollAnimSection({
  frameFolder,
  frameCount,
  chapters,
  isRtl = false,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [startedLoading, setStartedLoading] = useState(false);

  // Canvas DPR sizing
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    if (imagesRef.current.length > 0) {
      renderFrameToCanvas(frameRef.current, imagesRef.current, canvas);
    }
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    return () => window.removeEventListener("resize", syncCanvasSize);
  }, [syncCanvasSize]);

  // IntersectionObserver — triggers load + play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        setIsVisible(visible);
        if (visible && !startedLoading) setStartedLoading(true);
      },
      { threshold: 0.15 },
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [startedLoading]);

  // Load frames
  useEffect(() => {
    if (!startedLoading) return;
    const images: HTMLImageElement[] = [];
    let cancelled = false;
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      const fi = i;
      img.onload = () => {
        if (cancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (fi === 0 && canvasRef.current) {
          renderFrameToCanvas(0, images, canvasRef.current);
        }
      };
      img.src = `${BASE}/frames/${frameFolder}/${pad(i)}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [startedLoading, frameFolder, frameCount]);

  // Autoplay loop — rAF-based, only runs when section is visible
  useEffect(() => {
    const minFrames = Math.min(30, frameCount);
    if (!isVisible || loadedCount < minFrames) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    function loop(time: number) {
      if (time - lastTimeRef.current >= INTERVAL_MS) {
        lastTimeRef.current = time;

        const next = (frameRef.current + 1) % frameCount;
        frameRef.current = next;

        // Chapter based on playback progress
        const progress = next / Math.max(frameCount - 1, 1);
        let ci = 0;
        for (let i = chapters.length - 1; i >= 0; i--) {
          if (progress >= chapters[i].startProgress) {
            ci = i;
            break;
          }
        }
        setChapterIdx(ci);

        const canvas = canvasRef.current;
        const imgs = imagesRef.current;
        if (canvas && imgs[next]?.complete) {
          renderFrameToCanvas(next, imgs, canvas);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, loadedCount, frameCount, chapters]);

  const chapter = chapters[chapterIdx];
  const loadPercent = frameCount > 0 ? Math.round((loadedCount / frameCount) * 100) : 0;
  const isReady = loadedCount >= Math.min(10, frameCount);
  const titleParts = chapter?.title.split(". ").filter(Boolean) ?? [];

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#030b18]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.6s ease" }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Loading bar */}
      {loadPercent < 100 && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-white/10 z-30">
          <div
            className="h-full bg-secondary transition-all duration-300 ease-out"
            style={{ width: `${loadPercent}%` }}
          />
        </div>
      )}

      {/* Chapter text */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-center ${
          isRtl ? "items-end" : "items-start"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-24">
          <AnimatePresence mode="wait">
            {chapter && (
              <motion.div
                key={chapterIdx}
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={isRtl ? "text-right" : "text-left"}
              >
                <motion.p
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-secondary text-xs font-bold tracking-[0.35em] uppercase mb-5"
                >
                  ENVOD KINGDOM SHIPPING SERVICES LLC
                </motion.p>

                <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] max-w-4xl">
                  {isRtl && chapter.titleAr ? (
                    chapter.titleAr
                  ) : (
                    titleParts.map((part, i) => (
                      <span key={i} className="block">
                        {i === 1 ? (
                          <span className="text-secondary">{part}.</span>
                        ) : (
                          `${part}${i < titleParts.length - 1 ? "." : ""}`
                        )}
                      </span>
                    ))
                  )}
                </h2>

                {chapter.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-6 text-base md:text-lg text-white/65 max-w-2xl font-light leading-relaxed"
                  >
                    {isRtl && chapter.subtitleAr
                      ? chapter.subtitleAr
                      : chapter.subtitle}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 0.6 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
}
