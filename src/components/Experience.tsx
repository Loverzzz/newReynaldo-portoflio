import type { ExperienceItem } from "../data";

type ExperienceProps = {
  items?: ExperienceItem[];
};

export default function Experience({ items = [] }: ExperienceProps) {
  return (
    <div className="timeline">
      {items.map((exp) => (
        <article className="tItem" key={`${exp.company}-${exp.period}`}>
          <div className="tDot" aria-hidden="true" />
          <div className="tCard">
            <div className="tTop">
              <div>
                <h3 className="h3">{exp.role}</h3>
                <div className="muted">
                  {exp.company} • {exp.location}
                </div>
              </div>
              <div className="pill">{exp.period}</div>
            </div>

            <ul className="list">
              {exp.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}