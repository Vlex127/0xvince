import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Skills } from "@/components/Skills"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { CTF } from "@/components/CTF"
import { Blog } from "@/components/Blog"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { Divider } from "@/components/Divider"
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg"

export default function Home() {
  return (
    <>
      <Navigation />
      <KonamiEasterEgg />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <CTF />
        <Divider />
        <Blog />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
