import { Metadata } from "next";
import AboutHero from "@/components/marketing/about/AboutHero";
import AboutStats from "@/components/marketing/about/AboutStats";
import AboutValues from "@/components/marketing/about/AboutValues";
import ServiceCTA from "@/components/marketing/services/ServiceCTA";

export const metadata: Metadata = {
  title: "About Us | NeXar",
  description: "Learn about our mission to empower businesses worldwide with the best e-commerce platform.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <AboutHero />
      <AboutStats />
      <AboutValues />
      <ServiceCTA />
    </main>
  );
}
