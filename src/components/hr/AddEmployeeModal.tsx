import React, { useState } from "react";
import { X } from "lucide-react";
import { Branch } from "@/types";
import { Button } from "@/components/ui/Button";
import { AddEmployeeFormFields, NewEmployeeForm } from "./AddEmployeeFormFields";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
  onAdd: (data: NewEmployeeForm) => void;
}

export function AddEmployeeModal({
  isOpen,
  onClose,
  branches,
  onAdd,
}: AddEmployeeModalProps) {
  const [formData, setFormData] = useState<NewEmployeeForm>({
    name: "",
    email: "",
    phone: "",
    designation: "Sales Advisor",
    department: "Sales",
    branchId: branches[0]?.id || "br-1",
    baseSalary: 20000,
    commissionRate: 1.0,
    bankAccountNo: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-extrabold text-foreground">Add New Employee</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <AddEmployeeFormFields
            formData={formData}
            setFormData={setFormData}
            branches={branches}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="font-bold">
              Save Employee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
