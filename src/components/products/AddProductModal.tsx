import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Category, Product } from "@/types";
import { AddProductFormFields } from "./AddProductFormFields";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  categories: Category[];
  onSubmit: (e: React.FormEvent) => void;
}

export function AddProductModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  categories,
  onSubmit,
}: AddProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-subtle-lg p-6 space-y-4 animate-fade-slide">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">
            Add New Product SKU
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <AddProductFormFields
            formData={formData}
            setFormData={setFormData}
            categories={categories}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="shadow-subtle-xs">
              Save Product to Catalog
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
