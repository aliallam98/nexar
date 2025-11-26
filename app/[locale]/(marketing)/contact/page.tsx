import { Metadata } from "next";
import { WorldWinnerAnimation } from "@/components/marketing/WorldWinnerAnimation";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | NeXar",
  description: "Get in touch with our team for inquiries, support, or partnerships.",
};

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-background">
  
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container relative z-10">
          <WorldWinnerAnimation />
          
          <div className="text-center max-w-2xl mx-auto mb-4">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              We'd love to hear from you
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
          
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 relative">
        <div className="container px-4 mx-auto">
          <div className="relative z-10">
            <ContactForm />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/4" />
        </div>
      </section>

    </section>
  );
}
