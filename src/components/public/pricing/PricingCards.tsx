import React from "react";
import { PricingCardStarter } from "./PricingCardStarter";
import { PricingCardBusiness } from "./PricingCardBusiness";
import { PricingCardEnterprise } from "./PricingCardEnterprise";

interface PricingCardsProps {
  isYearly: boolean;
}

export function PricingCards({ isYearly }: PricingCardsProps) {
  const starterPrice = isYearly ? 2499 : 2999;
  const businessPrice = isYearly ? 5999 : 6999;
  const enterprisePrice = isYearly ? 12999 : 14999;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCardStarter price={starterPrice} isYearly={isYearly} />
      <PricingCardBusiness price={businessPrice} isYearly={isYearly} />
      <PricingCardEnterprise price={enterprisePrice} isYearly={isYearly} />
    </div>
  );
}
