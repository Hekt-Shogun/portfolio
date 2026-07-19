import GameMenu from "@/components/GameMenu";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <GameMenu />
      <Hero />
      <MarqueeStrip />
      <About />
      <Skills />
      <MarqueeStrip />
      <Projects />
      <Timeline />
      <Contact />
    </main>
  );
}
