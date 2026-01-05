import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Section({ id, eyebrow, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="sectionHead">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2 className="h2">{title}</h2>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}