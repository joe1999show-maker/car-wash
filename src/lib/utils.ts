import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PLANS } from "@/data/dt";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function CalculateTotal (Plans: PLANS, plan, extra){

}
