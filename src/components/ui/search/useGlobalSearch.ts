import { useState, useEffect } from "react";
import { storageService } from "@/lib/services/storage";

export function useGlobalSearch(query: string, isOpen: boolean) {
  const [products, setProducts] = useState(storageService.getProducts());
  const [customers, setCustomers] = useState(storageService.getCustomers());
  const [sales, setSales] = useState(storageService.getSales());

  useEffect(() => {
    if (isOpen) {
      setProducts(storageService.getProducts());
      setCustomers(storageService.getCustomers());
      setSales(storageService.getSales());
    }
  }, [isOpen]);

  const q = query.trim().toLowerCase();

  const filteredProducts = q
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.barcode.includes(query.trim())
        )
        .slice(0, 4)
    : [];

  const filteredCustomers = q
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.phone.includes(query.trim())
        )
        .slice(0, 3)
    : [];

  const filteredSales = q
    ? sales
        .filter(
          (s) =>
            s.invoiceNumber.toLowerCase().includes(q) ||
            (s.customerName && s.customerName.toLowerCase().includes(q))
        )
        .slice(0, 3)
    : [];

  return { filteredProducts, filteredCustomers, filteredSales };
}
