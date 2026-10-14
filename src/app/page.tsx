import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { AiSection } from "@/components/sections/AiSection";
import { Contact } from "@/components/sections/Contact";
import { HeroBento } from "@/components/sections/HeroBento";
import { Research } from "@/components/sections/Research";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <div id="content" className="relative z-(--z-content)">
      <main>
        <HeroBento />
        <About />
        <AiSection />
        <Work />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
