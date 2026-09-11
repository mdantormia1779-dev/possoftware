"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EditPaymentMethodFields } from "./EditPaymentMethodFields";

interface EditPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: any;
  onSave: (updated: any) => Promise<void>;
}

export function EditPaymentMethodModal({
  isOpen,
  onClose,
  method,
  onSave,
}: EditPaymentMethodModalProps) {
  const [formData, setFormData] = useState<any>(method || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (method) setFormData(method);
  }, [method]);

  if (!method) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${method.name} Details`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EditPaymentMethodFields formData={formData} onChange={setFormData} />

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="active-toggle"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
          <label htmlFor="active-toggle" className="text-xs font-bold text-foreground cursor-pointer">
            Active on Customer Checkout Page
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 font-bold"
          >
            {loading ? "Saving..." : "Save Details"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
