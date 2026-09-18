import { Capabilities } from "@/components/capabilities";
import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";

export default function Home() {
  return (
    <ContactProvider>
      <main>
        <Hero />
        <TrustedBy />
        <Capabilities />
      </main>
      <Footer />
    </ContactProvider>
  );
}
