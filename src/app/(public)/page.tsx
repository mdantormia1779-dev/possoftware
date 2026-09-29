"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { LandingHeroSection } from "@/components/public/landing/LandingHeroSection";
import { LandingFeaturesSection } from "@/components/public/landing/LandingFeaturesSection";
import { LandingCategoriesSection } from "@/components/public/landing/LandingCategoriesSection";
import { LandingOfflineSimulator } from "@/components/public/landing/LandingOfflineSimulator";
import { LandingBentoSection } from "@/components/public/landing/LandingBentoSection";
import { LandingPricingSection } from "@/components/public/landing/LandingPricingSection";
import { LandingFaqSection } from "@/components/public/landing/LandingFaqSection";
import { LandingCtaSection } from "@/components/public/landing/LandingCtaSection";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;

    // gsap.context makes cleanup safe (also under React strict mode)
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        y: 30,
        x: 20,
        scale: 1.08,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="space-y-24 sm:space-y-32 pb-24 overflow-hidden"
    >
      <LandingHeroSection glowRef={glowRef} />
      <LandingFeaturesSection />
      <LandingCategoriesSection />
      <LandingOfflineSimulator />
      <LandingBentoSection />
      <LandingPricingSection />
      <LandingFaqSection />
      <LandingCtaSection />
    </div>
  );
}