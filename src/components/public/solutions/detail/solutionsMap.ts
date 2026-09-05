import { SolutionData } from "./solutionTypes";
import { retailSolutionData } from "./retailSolutionData";
import { grocerySolutionData } from "./grocerySolutionData";
import { fashionSolutionData } from "./fashionSolutionData";
import { electronicsSolutionData } from "./electronicsSolutionData";
import { restaurantSolutionData } from "./restaurantSolutionData";
import { pharmacySolutionData } from "./pharmacySolutionData";

export const SOLUTIONS_MAP: Record<string, SolutionData> = {
  retail: retailSolutionData,
  grocery: grocerySolutionData,
  fashion: fashionSolutionData,
  electronics: electronicsSolutionData,
  restaurant: restaurantSolutionData,
  pharmacy: pharmacySolutionData,
};

export const STATIC_SLUGS = [
  { slug: "retail" },
  { slug: "grocery" },
  { slug: "fashion" },
  { slug: "electronics" },
  { slug: "restaurant" },
  { slug: "pharmacy" },
];

export function getSolution(slug: string): SolutionData | undefined {
  return SOLUTIONS_MAP[slug];
}
