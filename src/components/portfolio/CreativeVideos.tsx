"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  X,
  Film,
  Clapperboard,
  Sparkles,
  Trophy,
  Clock,
  Calendar,
  Filter,
  ChevronRight,
  ChevronLeft,
  Images,
} from "lucide-react";
import type { VideoItem } from "@/data/portfolio";
import { videoCategories } from "@/data/portfolio";

interface CreativeVideosProps {
  items: VideoItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function getEmbedUrl(url: string): string {
  const id = getYouTubeId(url);
  if (!id) return "";
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

function isInstagramUrl(url: string): boolean {
  return url.includes("instagram.com");
}

function getThumbnailUrl(video: VideoItem): string {
  if (video.thumbnail) return video.thumbnail;
  const id = getYouTubeId(video.videoUrl);
  if (id && !video.videoUrl.includes("YOUR_VIDEO_ID_HERE")) {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  return "";
}

const categoryColors: Record<string, string> = {
  Cinematic: "oklch(0.65 0.20 30)",
  "Short-form": "oklch(0.65 0.18 280)",
  Corporate: "oklch(0.60 0.15 200)",
  "AI Creative": "oklch(0.65 0.20 160)",
  All: "oklch(0.60 0.15 240)",
};

// ─── Gallery Lightbox ─────────────────────────────────────────────────────────
function GalleryLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Counter */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-black/60 text-white/70 text-xs backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Gallery ${current + 1}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="w-full max-h-[80vh] object-contain rounded-xl"
          />
        </AnimatePresence>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const embedUrl = getEmbedUrl(video.videoUrl);
  const isPlaceholder = video.videoUrl.includes("YOUR_VIDEO_ID_HERE");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasGallery = video.galleryImages && video.galleryImages.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        {/* Modal container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Glow */}
          <div
            className="absolute -inset-2 rounded-3xl blur-2xl opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${categoryColors[video.category] || categoryColors.All}, transparent)`,
            }}
          />

          {/* Video player */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            {isPlaceholder ? (
              <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-zinc-900 to-zinc-800">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: categoryColors[video.category] }}
                >
                  <Film className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/60 text-sm text-center px-8">
                  URL video belum diisi.
                  <br />
                  Ganti{" "}
                  <code className="text-white/80 bg-white/10 px-1 rounded">
                    YOUR_VIDEO_ID_HERE
                  </code>{" "}
                  dengan YouTube ID di{" "}
                  <code className="text-white/80 bg-white/10 px-1 rounded">
                    src/data/portfolio.ts
                  </code>
                </p>
              </div>
            ) : isInstagramUrl(video.videoUrl) ? (
              <div className="aspect-video flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-zinc-900 to-zinc-800">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                  }}
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="text-center px-8">
                  <p className="text-white font-semibold text-lg mb-1">
                    {video.title}
                  </p>
                  <p className="text-white/60 text-sm mb-5">
                    Video ini tersedia di Instagram Reels
                  </p>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
                    style={{
                      background:
                        "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Watch on Instagram
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={embedUrl}
                className="w-full aspect-video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            )}

            {/* Bottom info bar */}
            <div className="p-4 bg-zinc-900/90 border-t border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {/* Multiple awards */}
                  {video.awards && video.awards.length > 0 ? (
                    <div className="flex flex-col gap-1 mb-2">
                      {video.awards.map((aw) => (
                        <span
                          key={aw.label}
                          className="flex items-center gap-1 text-xs font-semibold text-yellow-400"
                        >
                          {aw.icon} {aw.label}
                        </span>
                      ))}
                    </div>
                  ) : video.award ? (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center gap-1 text-xs font-semibold text-yellow-400">
                        <Trophy className="w-3 h-3" />
                        {video.award}
                      </span>
                    </div>
                  ) : null}
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {video.title}
                  </h3>
                  {video.role && (
                    <p className="text-white/50 text-xs mt-0.5">
                      Role:{" "}
                      <span className="text-white/80 font-medium">
                        {video.role}
                      </span>
                    </p>
                  )}
                  <p className="text-white/60 text-sm mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-right shrink-0">
                  {video.year && (
                    <span className="text-white/50 text-xs flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3" />
                      {video.year}
                    </span>
                  )}
                  {video.duration && video.duration !== "0:00" && (
                    <span className="text-white/50 text-xs flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery section */}
            {hasGallery && (
              <div className="p-4 bg-zinc-950/90 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Images className="w-4 h-4 text-white/50" />
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                    Behind the Scenes · {video.galleryImages!.length} Photos
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {video.galleryImages!.map((img, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLightboxIndex(i)}
                      className="relative aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-200 group/img"
                    >
                      <img
                        src={img}
                        alt={`${video.title} photo ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors duration-200" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && hasGallery && (
        <GalleryLightbox
          images={video.galleryImages!}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </AnimatePresence>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({
  video,
  index,
  onClick,
}: {
  video: VideoItem;
  index: number;
  onClick: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tilt = useTilt({ strength: 6, stiffness: 250, damping: 28 });
  const [imgError, setImgError] = useState(false);

  const thumbUrl = getThumbnailUrl(video);
  const accentColor = categoryColors[video.category] || categoryColors.All;
  const isPlaceholder = video.videoUrl.includes("YOUR_VIDEO_ID_HERE");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      ref={tilt.ref}
      onMouseMove={tilt.handleMouse}
      onMouseLeave={tilt.handleLeave}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group will-change-transform cursor-pointer"
      onClick={onClick}
    >
      {/* Glow */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}44, transparent)`,
        }}
      />

      <div
        className={`relative h-full rounded-2xl overflow-hidden border transition-all duration-500
          ${
            isDark
              ? "bg-card/80 border-border/50 hover:border-white/20"
              : "bg-card/90 border-border/50 hover:border-white/30"
          }
          hover:shadow-2xl`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-zinc-900">
          {thumbUrl && !imgError ? (
            <img
              src={thumbUrl}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
              }}
            >
              <Clapperboard
                className="w-12 h-12 opacity-30"
                style={{ color: accentColor }}
              />
            </div>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-white/30"
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </motion.div>
          </div>

          {/* Award badge */}
          {video.award && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/90 backdrop-blur-sm text-xs font-bold text-black shadow-lg">
              <Trophy className="w-3 h-3" />
              Award Winner
            </div>
          )}

          {/* Category pill */}
          <div
            className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold text-white backdrop-blur-sm"
            style={{ background: `${accentColor}cc` }}
          >
            {video.category}
          </div>

          {/* Duration */}
          {video.duration && video.duration !== "0:00" && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-xs text-white font-mono">
              {video.duration}
            </div>
          )}

          {/* Placeholder indicator */}
          {isPlaceholder && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-orange-500/80 text-xs text-white">
              URL needed
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4">
          {video.awards && video.awards.length > 0 ? (
            <div className="flex flex-col gap-0.5 mb-2">
              {video.awards.map((aw) => (
                <p
                  key={aw.label}
                  className="text-yellow-500 text-[10px] font-semibold flex items-center gap-1 leading-snug"
                >
                  <span>{aw.icon}</span>
                  <span className="line-clamp-1">{aw.label}</span>
                </p>
              ))}
            </div>
          ) : video.award ? (
            <p className="text-yellow-500 text-xs font-semibold mb-1 flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {video.award}
            </p>
          ) : null}
          <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand transition-colors duration-200">
            {video.title}
          </h3>
          {video.role && (
            <p className="text-muted-foreground text-[10px] mb-1">
              Role:{" "}
              <span className="font-semibold text-foreground/70">
                {video.role}
              </span>
              {video.platform && (
                <span className="ml-1">· {video.platform}</span>
              )}
            </p>
          )}
          <p className="text-muted-foreground text-xs line-clamp-2 mb-3 leading-relaxed">
            {video.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {video.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0"
                >
                  {tag}
                </Badge>
              ))}
              {video.tags.length > 2 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  +{video.tags.length - 2}
                </Badge>
              )}
            </div>
            {video.year && (
              <span className="text-muted-foreground text-[10px] flex items-center gap-0.5">
                <Calendar className="w-2.5 h-2.5" />
                {video.year}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ items }: { items: VideoItem[] }) {
  const stats = [
    { icon: Film, label: "Videos", value: items.length.toString() },
    {
      icon: Trophy,
      label: "Awards Won",
      value: items.filter((v) => v.award).length.toString(),
    },
    {
      icon: Clapperboard,
      label: "Categories",
      value: [...new Set(items.map((v) => v.category))].length.toString(),
    },
    { icon: Sparkles, label: "Tools", value: "5+" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center gap-1 p-4 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm"
        >
          <s.icon className="w-5 h-5 text-brand mb-0.5" />
          <span className="text-2xl font-bold text-foreground">{s.value}</span>
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreativeVideos({ items }: CreativeVideosProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Attach stable ids (original index) so duplicate titles get unique React keys.
  const itemsWithId = useMemo(
    () => items.map((v, i) => ({ ...v, _id: i })),
    [items],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? itemsWithId
        : itemsWithId.filter((v) => v.category === activeCategory),
    [activeCategory, itemsWithId],
  );

  // Order: Di Balik Kemudi (featured) first at the top-left of the grid,
  // then the rest sorted newest → oldest by year (2026 → 2022).
  const sortedFiltered = useMemo(() => {
    const featured = filtered.find((v) => v.featured);
    const rest = filtered.filter((v) => !v.featured);
    rest.sort((a, b) => {
      const ya = parseInt(a.year ?? "0", 10) || 0;
      const yb = parseInt(b.year ?? "0", 10) || 0;
      return yb - ya; // descending (newest first)
    });
    return featured ? [featured, ...rest] : rest;
  }, [filtered]);

  const handleOpen = useCallback((video: VideoItem) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideo(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section id="creative" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "oklch(0.65 0.20 30)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "oklch(0.65 0.18 280)" }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/5 backdrop-blur-sm mb-4">
            <Clapperboard className="w-4 h-4 text-brand" />
            <span className="text-sm font-medium text-brand">
              Creative Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Video{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Creative works — from award-winning short films at film festivals to AI-generated content. Every frame is a story.
          </p>
        </motion.div>

        {/* Stats */}
        <StatsBar items={items} />

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-8 items-center"
        >
          <Filter className="w-4 h-4 text-muted-foreground mr-1" />
          {videoCategories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full text-xs transition-all duration-200 ${
                activeCategory === cat
                  ? "shadow-lg shadow-brand/20"
                  : "hover:border-brand/40 hover:text-brand"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60">
                  {items.filter((v) => v.category === cat).length}
                </span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* Video grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedFiltered.map((video, i) => (
              <VideoCard
                key={video._id}
                video={video}
                index={i}
                onClick={() => handleOpen(video)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {sortedFiltered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground"
          >
            <Film className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Tidak ada video dalam kategori ini.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm mb-3">
            Excited to Collaborate?
          </p>
          <a href="#contact">
            <Button
              variant="outline"
              className="rounded-full gap-2 hover:border-brand/50 hover:text-brand transition-all"
            >
              Let&apos;s Work Together
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleClose} />
      )}
    </section>
  );
}
