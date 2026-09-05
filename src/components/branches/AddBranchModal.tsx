import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddBranchFormFields, BranchFormData } from "./AddBranchFormFields";

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: BranchFormData) => void;
}

const INITIAL_FORM: BranchFormData = {
  name: "",
  code: "",
  phone: "",
  email: "",
  address: "",
  city: "Dhaka",
  managerName: "",
  managerPhone: "",
};

export function AddBranchModal({ isOpen, onClose, onAdd }: AddBranchModalProps) {
  const [form, setForm] = useState<BranchFormData>(INITIAL_FORM);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code) return;
    onAdd(form);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-extrabold text-foreground">Add New Outlet Branch</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <AddBranchFormFields form={form} setForm={setForm} />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="font-bold">
              Save Branch
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
