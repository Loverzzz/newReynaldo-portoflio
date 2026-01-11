import { useState } from "react";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

import { achievements, experiences, profile, projects, skills } from "./data";

import profileImg from "./assets/Profile.jpg";
import envelopeIcon from "./assets/envelope.svg";
import linkedinIcon from "./assets/linkedin.svg";
import whatsappIcon from "./assets/whatsapp.svg";

export default function App() {
  const phoneDigits = profile.phone.replace(/\D/g, "");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent mailto trigger
    e.stopPropagation(); // Prevent card click
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <section id="about" className="hero">
        <div className="container heroGrid">
          {/* LEFT */}
          <div className="heroText">
            <div className="kicker">PORTFOLIO</div>
            <h1 className="h1">{profile.name}</h1>
            <p className="lead">{profile.headline}</p>
            <p className="muted">{profile.summary}</p>
            <div className="actions">
              <a
                className="btn primary"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                Email
              </a>
              <a
                className="btn"
                href={`https://wa.me/${phoneDigits}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="stats">
              {profile.highlights.map((h) => (
                <div className="stat" key={h.label}>
                  <div className="statValue">{h.value}</div>
                  <div className="muted small">{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image + Card */}
          <div className="heroRight">
            <div className="heroImageWrapper">
              <img
                src={profileImg}
                alt={profile.name}
                className="heroImage"
                loading="lazy"
              />
            </div>
            <aside className="heroCard">
              <div className="heroCardInner">
                <div className="heroMeta">
                  <div className="pill">Location: {profile.location}</div>
                  <div className="pill">Email: {profile.email}</div>
                  <div className="pill">Phone: {profile.phone}</div>
                </div>
                <hr className="divider" />
                <div>
                  <div className="muted small">Achievements</div>
                  <ul className="list compact">
                    {achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Section
        id="skills"
        eyebrow="What I use"
        title="Skills"
        subtitle="A blend of content operations, data, ML, and creative production."
      >
        <Skills items={skills} />
      </Section>

      <Section
        id="experience"
        eyebrow="Timeline"
        title="Experience"
        subtitle="Roles and impact-focused contributions."
      >
        <Experience items={experiences} />
      </Section>

      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects"
        subtitle="Flying Higher and Infinity — the rocket is ready."
      >
        <Projects items={projects} />
      </Section>

      <Section
        id="contact"
        eyebrow="Let's talk"
        title="Contact"
        subtitle="Open for opportunities and collaborations."
      >
        <div className="contact">
          {/* Email Card - Seluruh card bisa diklik */}
          <a
            className="contactCard contactCardLink"
            href={`mailto:${profile.email}`}
            aria-label="Email contact"
          >
            <div className="muted small">Email</div>
            <div className="contactRow">
              <span className="h3 link">
                <img
                  src={envelopeIcon}
                  alt="Email icon"
                  className="contactIcon"
                />
                {profile.email}
              </span>
              <button
                type="button"
                className="copyBtn"
                onClick={copyEmail}
                aria-label="Copy email"
                title={copiedEmail ? "Copied" : "Copy email"}
              >
                {copiedEmail ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M16 1H4a1 1 0 0 0-1 1v14h2V3h11V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </a>

          {/* LinkedIn Card - Seluruh card bisa diklik */}
          <a
            className="contactCard contactCardLink"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn contact"
          >
            <div className="muted small">LinkedIn</div>
            <span className="h3 link">
              <img
                src={linkedinIcon}
                alt="LinkedIn icon"
                className="contactIcon"
              />
              Visit profile
            </span>
          </a>

          {/* WhatsApp Card - Seluruh card bisa diklik */}
          <a
            className="contactCard contactCardLink"
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp contact"
          >
            <div className="muted small">WhatsApp</div>
            <span className="h3 link">
              <img
                src={whatsappIcon}
                alt="WhatsApp icon"
                className="contactIcon"
              />
              Chat
            </span>
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
