import { Metadata } from "next";
import ServiceHero from "@/components/marketing/services/ServiceHero";
import ServiceFeatures from "@/components/marketing/services/ServiceFeatures";
import OrderSectionDemo from "@/components/marketing/services/OrderSectionDemo";
import ServiceCTA from "@/components/marketing/services/ServiceCTA";
import ServiceCategoriesGrid from "@/components/marketing/services/ServiceCategoriesGrid";
import ServiceProcessSection from "@/components/marketing/services/ServiceProcessSection";
import IntegrationPartnersSection from "@/components/marketing/services/IntegrationPartnersSection";

export const metadata: Metadata = {
  title: "Services - NeXar E-Commerce Platform | Award-Winning Solutions",
  description: "Discover NeXar's flagship e-commerce platform. Build, scale, and manage your store with our drag-and-drop builder, global reach, and powerful analytics. Start your free trial today.",
  keywords: ["e-commerce platform", "online store builder", "global commerce", "analytics", "order management"],
  openGraph: {
    title: "Services - NeXar E-Commerce Platform",
    description: "The future of e-commerce is here. Build stunning storefronts, sell globally, and grow with data-driven insights.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <ServiceHero />
      <ServiceCategoriesGrid />
      <ServiceProcessSection />
      <ServiceFeatures />
      <IntegrationPartnersSection />
      <OrderSectionDemo />
      <ServiceCTA />
    </main>
  );
}
