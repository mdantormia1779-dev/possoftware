"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { LandingHeroSection } from "@/components/public/landing/LandingHeroSection";
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
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          rotation: 360,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      <LandingHeroSection glowRef={glowRef} />
      <LandingCategoriesSection />
      <LandingOfflineSimulator />
      <LandingBentoSection />
      <LandingPricingSection />
      <LandingFaqSection />
      <LandingCtaSection />
    </div>
  );
}
