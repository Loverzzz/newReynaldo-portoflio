"use client";

import { useState } from "react";
import type { ExperienceItem } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Section";

const VISIBLE_BULLETS = 3;

function Role({ item }: { item: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false);
  const bullets = expanded ? item.bullets : item.bullets.slice(0, VISIBLE_BULLETS);
  const hidden = item.bullets.length - VISIBLE_BULLETS;

  return (
    <Reveal>
      <article className="grid gap-4 border-t py-8 md:grid-cols-12 md:gap-8 md:py-10">
        <div className="md:col-span-3">
          <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
          <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
        </div>

        <div className="md:col-span-9">
          <div className="flex items-start gap-4">
            {item.logo && (
              <img
                src={item.logo}
                alt=""
                className="mt-1 size-10 shrink-0 rounded-sm border bg-white object-contain p-1"
              />
            )}
            <div>
              <h3 className="text-xl font-medium leading-snug">{item.role}</h3>
              <p className="text-muted-foreground">{item.company}</p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-foreground/80">
            {bullets.map((b) => (
              <li key={b} className="relative pl-5">
                <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-muted-foreground" />
                {b}
              </li>
            ))}
          </ul>

          {hidden > 0 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-4 text-sm text-accent hover:underline"
            >
              {expanded ? "Show less" : `+ ${hidden} more`}
            </button>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        index="02"
        label="Experience"
        title="Where I've worked"
        aside="Creative production, content operations and engineering — five roles across Bali, Jakarta and Surabaya."
      />
      <div className="border-b">
        {items.map((item) => (
          <Role key={`${item.company}-${item.period}`} item={item} />
        ))}
      </div>
    </section>
  );
}
