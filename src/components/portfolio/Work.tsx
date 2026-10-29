"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import type { VideoItem } from "@/data/portfolio";
import { videoCategories } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Section";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|watch\/|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

const isShorts = (url: string) => url.includes("/shorts/");
const isInstagram = (url: string) => url.includes("instagram.com");

function thumbnailFor(video: VideoItem, size: "hq" | "maxres" = "hq") {
  if (video.thumbnail) return video.thumbnail;
  const id = getYouTubeId(video.videoUrl);
  return id ? `https://i.ytimg.com/vi/${id}/${size}default.jpg` : null;
}

function Thumb({
  video,
  size,
  className,
}: {
  video: VideoItem;
  size?: "hq" | "maxres";
  className?: string;
}) {
  const [src, setSrc] = useState(thumbnailFor(video, size));
  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-surface ${className}`}>
        <span className="font-serif text-lg text-muted-foreground">{video.client}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={video.title}
      loading="lazy"
      onError={() => {
        // maxres isn't generated for every upload — fall back to hq
        const hq = thumbnailFor(video, "hq");
        setSrc(src !== hq ? hq : null);
      }}
      className={`object-cover ${className}`}
    />
  );
}

// ─── Player modal ─────────────────────────────────────────────────────────────
function PlayerModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  const id = getYouTubeId(video.videoUrl);
  const vertical = isShorts(video.videoUrl);
  const [photo, setPhoto] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (photo !== null) setPhoto(null);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, photo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={`relative mx-auto ${vertical ? "max-w-sm" : "max-w-4xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="mb-3 ml-auto flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
        >
          Close <X className="size-4" />
        </button>

        <div className="overflow-hidden rounded-sm bg-black">
          {id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              className={`w-full ${vertical ? "aspect-[9/16]" : "aspect-video"}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title={video.title}
            />
          ) : (
            <div className="relative aspect-video">
              <Thumb video={video} className="absolute inset-0 size-full opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-sm text-white/80">This one lives on Instagram.</p>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
                >
                  Watch on Instagram <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#161614] p-5 text-white md:p-7">
          <p className="eyebrow !text-white/50">
            {[video.client, video.year, video.role].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl">{video.title}</h3>
          {video.description && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              {video.description}
            </p>
          )}
          {video.awards && (
            <ul className="mt-4 space-y-1 text-sm text-white/85">
              {video.awards.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-accent">—</span>
                  {a}
                </li>
              ))}
            </ul>
          )}
          {video.galleryImages && (
            <div className="mt-6">
              <p className="eyebrow !text-white/50">Behind the scenes</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {video.galleryImages.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setPhoto(i)}
                    className="aspect-video overflow-hidden rounded-sm"
                  >
                    <img
                      src={img}
                      alt={`${video.title} — still ${i + 1}`}
                      className="size-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {photo !== null && video.galleryImages && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4"
          onClick={(e) => {
            e.stopPropagation();
            setPhoto(null);
          }}
        >
          <img
            src={video.galleryImages[photo]}
            alt={`${video.title} — still ${photo + 1}`}
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
          />
        </div>
      )}
    </motion.div>
  );
}

// ─── Cards ───────────────────────────────────────────────────────────────────
function Featured({ video, onPlay }: { video: VideoItem; onPlay: () => void }) {
  return (
    <Reveal className="mb-16 grid gap-8 md:mb-20 md:grid-cols-12">
      <button
        onClick={onPlay}
        className="group relative block aspect-video overflow-hidden rounded-sm bg-surface text-left md:col-span-8"
        aria-label={`Play ${video.title}`}
      >
        <Thumb video={video} size="maxres" className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
          <Play className="size-3.5 fill-black" /> Watch
        </span>
      </button>

      <div className="flex flex-col md:col-span-4">
        <p className="eyebrow">Featured · {video.year}</p>
        <h3 className="mt-3 font-serif text-4xl leading-none tracking-tight md:text-5xl">
          {video.title}
        </h3>
        {video.role && (
          <p className="mt-3 text-sm text-muted-foreground">
            {video.client} — my role: <span className="text-foreground">{video.role}</span>
          </p>
        )}
        {video.awards && (
          <ul className="mt-6 divide-y border-y text-sm">
            {video.awards.map((a) => (
              <li key={a} className="py-2.5">
                {a}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

function Card({ video, onPlay }: { video: VideoItem; onPlay: () => void }) {
  const source = isInstagram(video.videoUrl) ? "Instagram" : "YouTube";
  return (
    <motion.button
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onPlay}
      className="group block text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
        <Thumb video={video} className="absolute inset-0 size-full transition-transform duration-500 group-hover:scale-[1.04]" />
        <span className="absolute right-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
          {source}
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex size-12 items-center justify-center rounded-full bg-white/95">
            <Play className="ml-0.5 size-4 fill-black text-black" />
          </span>
        </span>
      </div>
      <p className="eyebrow mt-3">
        {video.client} · {video.year}
      </p>
      <h3 className="mt-1 text-base font-medium leading-snug group-hover:text-accent">
        {video.title}
      </h3>
    </motion.button>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
const PAGE = 9;

export default function Work({ items }: { items: VideoItem[] }) {
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const close = useCallback(() => setPlaying(null), []);

  const featured = items.find((v) => v.featured);
  const rest = items.filter((v) => v !== featured);
  const filtered = category === "All" ? rest : rest.filter((v) => v.category === category);
  const visible = showAll ? filtered : filtered.slice(0, PAGE);
  const clients = new Set(items.map((v) => v.client).filter(Boolean)).size;

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        index="01"
        label="Selected work"
        title={
          <>
            Films, ads <span className="italic text-muted-foreground">&amp;</span> social video
          </>
        }
        aside={`${items.length} pieces for ${clients} brands and organisations — from a festival-winning short film to AI-assisted campaigns for Bali businesses.`}
      />

      {featured && <Featured video={featured} onPlay={() => setPlaying(featured)} />}

      <div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b">
        {videoCategories.map((cat) => {
          const count = cat === "All" ? rest.length : rest.filter((v) => v.category === cat).length;
          if (!count) return null;
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setShowAll(false);
              }}
              className={`-mb-px shrink-0 border-b-2 pb-3 text-sm transition-colors ${
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              <sup className="ml-1 font-mono text-[10px] text-muted-foreground">{count}</sup>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((v) => (
            <Card key={v.videoUrl} video={v} onPlay={() => setPlaying(v)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length > PAGE && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
          >
            {showAll ? "Show less" : `Show all ${filtered.length}`}
          </button>
        </div>
      )}

      <AnimatePresence>
        {playing && <PlayerModal video={playing} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
