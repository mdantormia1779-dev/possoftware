export interface ImportRow {
  name: string;
  sku: string;
  barcode: string;
  category: string;
  cost: number;
  price: number;
  stock: number;
  status: string;
}

export const MOCK_IMPORT_ROWS: ImportRow[] = [
  { name: "Executive Cufflink Set - Silver", sku: "CUFF-SLV-11", barcode: "890123456711", category: "Accessories", cost: 450, price: 950, stock: 25, status: "valid" },
  { name: "Semi-Formal Chino Pants - Khaki", sku: "CHINO-KHK-12", barcode: "890123456712", category: "Trousers & Denim", cost: 1200, price: 2250, stock: 30, status: "valid" },
  { name: "Formal Silk Necktie - Burgundy", sku: "TIE-BURG-13", barcode: "890123456713", category: "Accessories", cost: 350, price: 750, stock: 40, status: "valid" },
  { name: "Premium Polo Shirt - Charcoal", sku: "POLO-CHR-14", barcode: "", category: "Formal & Casual Shirts", cost: 850, price: 1650, stock: 20, status: "missing_barcode" },
];

export const IMPORT_STEPS = [
  { num: 1, title: "Upload File" },
  { num: 2, title: "Map Columns" },
  { num: 3, title: "Validate Data" },
  { num: 4, title: "Preview Rows" },
  { num: 5, title: "Import SKUs" },
];
