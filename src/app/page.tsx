"use client";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import SectionWrapper from "@/components/portfolio/SectionWrapper";
import Skills from "@/components/portfolio/Skills";
import Certifications from "@/components/portfolio/Certifications";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import {
  skills,
  certifications,
  experiences,
  projects,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <SectionWrapper
          id="skills"
          eyebrow="What I use"
          title="Skills"
          subtitle="A blend of content operations, data, ML, and creative production."
        >
          <Skills items={skills} />
        </SectionWrapper>

        <SectionWrapper
          id="certifications"
          eyebrow="Credentials"
          title="Certifications"
          subtitle="Continuous learning and professional competency."
        >
          <Certifications items={certifications} />
        </SectionWrapper>

        <SectionWrapper
          id="experience"
          eyebrow="Timeline"
          title="Experience"
          subtitle="Roles and impact-focused contributions."
        >
          <Experience items={experiences} />
        </SectionWrapper>

        <SectionWrapper
          id="projects"
          eyebrow="Selected work"
          title="Projects"
          subtitle="Flying Higher and Infinity — the rocket is ready."
        >
          <Projects items={projects} />
        </SectionWrapper>

        <SectionWrapper
          id="contact"
          eyebrow="Let's talk"
          title="Contact"
          subtitle="Open for opportunities and collaborations."
        >
          <Contact />
        </SectionWrapper>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
