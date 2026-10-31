import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PLAN, PLANS, EXTRA } from "@/data/dt";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function CalculateTotal (Plans: PLAN[], plan: number, extra: EXTRA){
return plan === null
      ? 0
      : PLANS[plan]!.price 
      // + VEHICLES[veh]![1] 
      // + extras.reduce((s, e) => s + EXTRAS[e]!.price, 0);
}
