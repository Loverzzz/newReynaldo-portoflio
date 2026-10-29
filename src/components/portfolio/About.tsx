"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CertificationItem, SkillGroup } from "@/data/portfolio";
import { achievements, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Section";

const VISIBLE_CERTS = 6;

export default function About({
  skills,
  certifications,
}: {
  skills: SkillGroup[];
  certifications: CertificationItem[];
}) {
  const [allCerts, setAllCerts] = useState(false);
  const certs = allCerts ? certifications : certifications.slice(0, VISIBLE_CERTS);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading index="04" label="About" title="A bit more about me" />

      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-7">
          <p className="font-serif text-2xl leading-snug md:text-[1.9rem]">{profile.summary}</p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <h3 className="eyebrow mb-4">Recognition</h3>
          <ul className="divide-y border-y text-sm">
            {achievements.map((a) => {
              const [title, detail] = a.split(" — ");
              return (
                <li key={a} className="py-3">
                  <span className="font-medium">{title}</span>
                  {detail && <span className="block text-muted-foreground">{detail}</span>}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <h3 className="eyebrow mb-4">{group.title}</h3>
            <ul className="space-y-2 text-[15px]">
              {group.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="eyebrow">Certifications</h3>
          <span className="font-mono text-xs text-muted-foreground">{certifications.length} total</span>
        </div>
        <ul className="border-t">
          {certs.map((c) => (
            <li key={c.title} className="border-b">
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-1 py-3.5 text-sm sm:grid-cols-[1fr_200px_140px_20px] sm:items-center sm:gap-6"
              >
                <span className="font-medium group-hover:text-accent">{c.title}</span>
                <span className="text-muted-foreground">{c.provider}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {c.issued?.split(" · ")[0]}
                </span>
                <ArrowUpRight className="hidden size-4 text-muted-foreground group-hover:text-accent sm:block" />
              </a>
            </li>
          ))}
        </ul>
        {certifications.length > VISIBLE_CERTS && (
          <button
            onClick={() => setAllCerts((a) => !a)}
            className="mt-4 text-sm text-accent hover:underline"
          >
            {allCerts ? "Show fewer" : `Show all ${certifications.length} certifications`}
          </button>
        )}
      </Reveal>
    </section>
  );
}
