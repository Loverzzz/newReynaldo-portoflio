"use client";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import ParticleBackground from "@/components/portfolio/ParticleBackground";
import SectionWrapper from "@/components/portfolio/SectionWrapper";
import Skills from "@/components/portfolio/Skills";
import Certifications from "@/components/portfolio/Certifications";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import CreativeVideos from "@/components/portfolio/CreativeVideos";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import {
  skills,
  certifications,
  experiences,
  projects,
  videos,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated particle background */}
      <ParticleBackground />
      
      <Navbar />

      <main className="flex-1 relative z-10">
        <Hero />

          <SectionWrapper
            id="skills"
            eyebrow="What I use"
            title="Skills"
            subtitle="A versatile blend of content operations, data, machine learning, and creative production."
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

          <Projects items={projects} />

          <CreativeVideos items={videos} />

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
