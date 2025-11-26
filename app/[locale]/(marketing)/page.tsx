"use client";
import RotatingTextEffect from "@/components/animations/RotatingTextEffect";

import ImageComparisonSlider from "@/components/animations/ImageComparisonSlider";
import CollectionSlider from "@/components/main-page-sections/CollectionSlider";
import ScrollVelocitySection from "@/components/main-page-sections/ScrollVelocitySection";
import { LandingSection } from "@/components/main-page-sections/LandingSection";
import { TrustedBySection } from "@/components/main-page-sections/TrustedBySection";
import { ProblemSolutionSection } from "@/components/main-page-sections/ProblemSolutionSection";
import { KeyFeaturesSection } from "@/components/main-page-sections/KeyFeaturesSection";

const MarketingMainPage = () => {
  return (
    <>
      <LandingSection />
      <TrustedBySection />
      <ProblemSolutionSection />
      <KeyFeaturesSection />
    </>
  );
};

export default MarketingMainPage;
