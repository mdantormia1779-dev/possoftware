import { Category, Product } from "@/types";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "@/data/initial-data";
import { offlineDb } from "../../db/dexie-db";
import { STORAGE_KEYS, getItem, setItem, isBrowser } from "./baseStorage";

export class ProductStorage {
  public getCategories(): Category[] {
    return getItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  public addCategory(cat: Category): void {
    const cats = [...this.getCategories(), cat];
    setItem(STORAGE_KEYS.CATEGORIES, cats);
  }

  public getProducts(): Product[] {
    return getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  public addProduct(product: Product): void {
    const prods = [product, ...this.getProducts()];
    setItem(STORAGE_KEYS.PRODUCTS, prods);
    if (isBrowser() && offlineDb) {
      offlineDb.products.put(product).catch(() => {});
    }
  }

  public updateProduct(product: Product): void {
    const prods = this.getProducts().map((p) => (p.id === product.id ? product : p));
    setItem(STORAGE_KEYS.PRODUCTS, prods);
    if (isBrowser() && offlineDb) {
      offlineDb.products.put(product).catch(() => {});
    }
  }

  public adjustStock(productId: string, branchId: string, deltaQty: number): void {
    const products = this.getProducts();
    const product = products.find((p) => p.id === productId);
    if (product) {
      product.totalStock = Math.max(0, product.totalStock + deltaQty);
      if (product.branchStocks) {
        product.branchStocks[branchId] = Math.max(0, (product.branchStocks[branchId] || 0) + deltaQty);
      }
      this.updateProduct(product);
    }
  }
}

export const productStorage = new ProductStorage();
