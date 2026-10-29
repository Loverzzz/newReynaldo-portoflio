import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Work from "@/components/portfolio/Work";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import {
  skillGroups,
  certifications,
  experiences,
  projects,
  videos,
} from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work items={videos} />
        <Experience items={experiences} />
        <Projects items={projects} />
        <About skills={skillGroups} certifications={certifications} />
        <Contact />
      </main>
    </>
  );
}
