import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface QuickAddCustomerFormProps {
  onSave: (name: string, phone: string) => void;
}

export function QuickAddCustomerForm({ onSave }: QuickAddCustomerFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (!name || !phone) return;
    onSave(name, phone);
    setName("");
    setPhone("");
  };

  return (
    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2 shadow-subtle-xs">
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full h-8 px-2.5 text-xs rounded-md border border-border bg-card"
      />
      <input
        type="text"
        placeholder="Phone (e.g. 01712-345678)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full h-8 px-2.5 text-xs rounded-md border border-border bg-card font-mono"
      />
      <Button size="xs" variant="primary" onClick={handleSave} className="w-full text-xs">
        Save &amp; Select Customer
      </Button>
    </div>
  );
}
