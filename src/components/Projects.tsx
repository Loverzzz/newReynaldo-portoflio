import type { ProjectItem } from "../data";

type ProjectsProps = {
  items?: ProjectItem[];
};

export default function Projects({ items = [] }: ProjectsProps) {
  return (
    <div className="grid">
      {items.map((p) => (
        <article className="card" key={p.title}>
          {p.image ? (
            <img
              className="projectImage"
              src={p.image}
              alt={p.title}
              style={{
                maxWidth: p.imageWidth ? `${p.imageWidth}px` : "100%",
                maxHeight: p.imageHeight ? `${p.imageHeight}px` : "180px",
                width: "100%",
                height: "auto",
              }}
            />
          ) : null}

          <div className="cardHead">
            <h3 className="h3">{p.title}</h3>
            {p.link ? (
              <a
                className="link"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <span className="muted small">Link soon</span>
            )}
          </div>

          <p className="muted">{p.description}</p>

          <div className="tags">
            {p.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
