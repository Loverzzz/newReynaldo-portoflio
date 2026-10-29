"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Section";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "WhatsApp", href: whatsappUrl },
    { label: "GitHub", href: profile.github },
  ];

  return (
    <section id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="eyebrow !text-background/60">05 — Contact</p>
          <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[1] tracking-tight md:text-8xl">
            Hiring for video, creative or data?{" "}
            <em className="text-accent">Let&apos;s talk.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-2xl md:text-3xl"
            >
              {profile.email}
            </a>
            <button
              onClick={copyEmail}
              className="ml-3 inline-flex items-center gap-1 align-middle text-xs text-background/60 hover:text-background"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <p className="mt-3 text-sm text-background/60">
              {profile.location}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm"
                >
                  <span className="link-underline">{l.label}</span>
                  <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-2 border-t border-background/15 pt-6 text-xs text-background/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top" className="hover:text-background">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
