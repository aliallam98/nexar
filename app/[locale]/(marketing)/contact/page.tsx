import { Metadata } from "next";
import ContactHero from "@/components/marketing/contact/ContactHero";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | NeXar",
  description: "Get in touch with our team for inquiries, support, or partnerships.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <ContactHero />
      
      <section className="pb-32 px-6 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[800px] bg-gradient-to-b from-purple-500/10 to-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
