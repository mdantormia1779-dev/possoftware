import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string | undefined | null, showSymbol = true): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return showSymbol ? "৳0.00" : "0.00";
  }
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const formatted = new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);

  return showSymbol ? `৳${formatted}` : formatted;
}

export function formatDate(dateStringOrObj: string | Date | undefined | null): string {
  if (!dateStringOrObj) return "-";
  const date = typeof dateStringOrObj === "string" ? new Date(dateStringOrObj) : dateStringOrObj;
  if (isNaN(date.getTime())) return "-";
  
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateStringOrObj: string | Date | undefined | null): string {
  if (!dateStringOrObj) return "-";
  const date = typeof dateStringOrObj === "string" ? new Date(dateStringOrObj) : dateStringOrObj;
  if (isNaN(date.getTime())) return "-";
  
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateInvoiceNumber(prefix = "INV"): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}${month}-${random}`;
}
