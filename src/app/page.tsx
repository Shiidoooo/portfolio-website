import { Footer } from "@/components/layout/Footer";
import { AiSection } from "@/components/sections/AiSection";
import { Contact } from "@/components/sections/Contact";
import { HeroBento } from "@/components/sections/HeroBento";
import { Journey } from "@/components/sections/Journey";
import { Research } from "@/components/sections/Research";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <div id="content" className="relative z-(--z-content)">
      <main>
        <HeroBento />
        <Journey />
        <AiSection />
        <Work />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
