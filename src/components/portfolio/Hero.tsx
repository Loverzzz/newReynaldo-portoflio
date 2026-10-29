"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-36">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <motion.p {...rise(0)} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-serif text-[2.9rem] leading-[0.98] tracking-tight sm:text-6xl md:text-[5.4rem]"
          >
            Reynaldo Arya.
            <br />
            <span className="text-muted-foreground">
              Video editor who{" "}
              <em className="text-accent">reads the data.</em>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80"
          >
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              See my work
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              <Mail className="size-4" />
              Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              <Linkedin className="size-4" />
              LinkedIn
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </a>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 md:pt-4"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm bg-surface md:max-w-none">
            <img
              src="/images/profile.jpg"
              alt={`Portrait of ${profile.name}`}
              className="size-full object-cover object-top mix-blend-multiply dark:mix-blend-normal"
            />
          </div>
          <figcaption className="eyebrow mx-auto mt-3 flex max-w-xs justify-between md:max-w-none">
            <span>{profile.name}</span>
            <span>Bali, ID</span>
          </figcaption>
        </motion.figure>
      </div>

      <motion.dl
        {...rise(0.32)}
        className="mt-16 grid grid-cols-2 gap-px border-y bg-border md:mt-24 md:grid-cols-4"
      >
        {profile.highlights.map((h) => (
          <div key={h.label} className="bg-background py-6 pr-4 [&:nth-child(even)]:pl-4 md:[&:not(:first-child)]:pl-5">
            <dt className="sr-only">{h.label}</dt>
            <dd className="font-serif text-4xl tracking-tight md:text-5xl">{h.value}</dd>
            <dd className="mt-1 text-sm leading-snug text-muted-foreground">{h.label}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
