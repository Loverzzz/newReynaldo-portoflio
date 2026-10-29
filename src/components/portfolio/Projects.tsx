"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/data/portfolio";
import { projectCategories, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Section";

export default function Projects({ items }: { items: ProjectItem[] }) {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? items : items.filter((p) => p.category === category);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        index="03"
        label="Data & engineering"
        title="Technical projects"
        aside={
          <>
            Machine learning, dashboards and IoT work from my engineering background. Code is on{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </>
        }
      />

      <div className="no-scrollbar mb-2 flex gap-6 overflow-x-auto border-b">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`-mb-px shrink-0 border-b-2 pb-3 text-sm transition-colors ${
              category === cat
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul>
        {filtered.map((p) => (
          <li key={p.title}>
            <Reveal>
              <a
                href={p.link ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-center gap-5 border-b py-6 sm:grid-cols-[160px_1fr_auto] md:gap-8"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-surface">
                  {p.image && (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  )}
                </div>
                <div>
                  <p className="eyebrow">{p.category}</p>
                  <h3 className="mt-1 text-lg font-medium leading-snug group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                    {p.tags.join(" / ")}
                  </p>
                </div>
                <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
