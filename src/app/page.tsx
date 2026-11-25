import Motion from "@/components/Motion";
import {
  About,
  Contact,
  Experience,
  Footer,
  Header,
  Hero,
  OpenSource,
  Projects,
  Skills,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Motion />
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
