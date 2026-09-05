export interface Category {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  imageUrl?: string;
  itemCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  priceAdjustment: number;
  stock: number;
}

export interface Product {
  id: string;
  organizationId: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  nameBn?: string;
  sku: string;
  barcode: string;
  description?: string;
  purchasePrice: number;
  sellingPrice: number;
  taxRate: number; // percentage (e.g. 5%)
  minStockAlert: number;
  unit: string; // pcs, kg, ltr, box, strip
  imageUrl?: string;
  totalStock: number;
  branchStocks?: Record<string, number>; // branchId -> qty
  variants?: ProductVariant[];
  isActive: boolean;
}
