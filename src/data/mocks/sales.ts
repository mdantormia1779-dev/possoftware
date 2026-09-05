import { Sale } from "@/types";
import { salesGroupA } from "./salesA";
import { salesGroupB } from "./salesB";

export const INITIAL_SALES: Sale[] = [
  ...salesGroupA,
  ...salesGroupB,
];
