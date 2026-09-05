import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddSupplierFormFields } from "./AddSupplierFormFields";

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    balanceDue: number;
  }) => void;
}

export function AddSupplierModal({
  isOpen,
  onClose,
  onAdd,
}: AddSupplierModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    address: "",
    balanceDue: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-subtle-lg p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Add New Vendor / Supplier</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <AddSupplierFormFields formData={formData} setFormData={setFormData} />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="shadow-subtle-xs">
              Save Supplier
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
