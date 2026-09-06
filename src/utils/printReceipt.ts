import { printDocument } from "./printDocument";

/**
 * Isolated thermal receipt printer.
 * Prints directly via an ephemeral iframe with 80mm roll dimensions.
 */
export function printReceipt(receiptElement: HTMLElement | null): void {
  printDocument(receiptElement, {
    size: "thermal-80mm",
    title: "POS Receipt",
    customStyles: `
      body {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        font-size: 11px !important;
        line-height: 1.25 !important;
        font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'calt' 1, 'tnum' 1 !important;
      }
      table { width: 100% !important; border-collapse: collapse !important; }
      th, td { padding: 3px 0 !important; vertical-align: top !important; }
    `,
  });
}
