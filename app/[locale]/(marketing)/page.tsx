"use client";
import RotatingTextEffect from "@/components/animations/RotatingTextEffect";

import ImageComparisonSlider from "@/components/animations/ImageComparisonSlider";
import CollectionSlider from "@/components/main-page-sections/CollectionSlider";
import ScrollVelocitySection from "@/components/main-page-sections/ScrollVelocitySection";
import { LandingSection } from "@/components/main-page-sections/LandingSection";
import { SaleSection } from "@/components/main-page-sections/SaleSection";
import { NewsletterHeroSection } from "@/components/main-page-sections/NewsletterHeroSection";
import ImageComparisonSection from "@/components/main-page-sections/ImageComparisonSection";

const MarketingMainPage = () => {
  return (
    <>
      <LandingSection />
      {/* <CollectionSlider />
      <ScrollVelocitySection />
      <ImageComparisonSection />
      <SaleSection
        saleTimeEndsIn={new Date("2025-9-01")}
        header="Coming Soon"
        subHeader="Stay tuned for our next sale"
        link="/products/sale"
        bgImage="/collections/all-products.webp"
      />
      <NewsletterHeroSection /> */}
    </>
  );
};

export default MarketingMainPage;
