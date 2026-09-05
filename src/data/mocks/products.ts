import { Product } from "@/types";
import { productsGroupA } from "./productsA";
import { productsGroupB } from "./productsB";
import { productsGroupC } from "./productsC";

export const INITIAL_PRODUCTS: Product[] = [
  ...productsGroupA,
  ...productsGroupB,
  ...productsGroupC,
];
