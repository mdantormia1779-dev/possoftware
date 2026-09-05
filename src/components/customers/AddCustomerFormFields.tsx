import React from "react";

interface AddCustomerFormFieldsProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    creditLimit: number;
  };
  setFormData: (val: any) => void;
}

export function AddCustomerFormFields({
  formData,
  setFormData,
}: AddCustomerFormFieldsProps) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Full Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Tanvir Ahmed"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Mobile Phone</label>
          <input
            type="text"
            required
            placeholder="+880 1711-xxxxxx"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Email</label>
          <input
            type="email"
            placeholder="tanvir@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-foreground">Delivery / Home Address</label>
        <input
          type="text"
          placeholder="Road 11, Banani, Dhaka"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-foreground">Credit Limit (৳)</label>
        <input
          type="number"
          value={formData.creditLimit}
          onChange={(e) =>
            setFormData({ ...formData, creditLimit: parseFloat(e.target.value) || 0 })
          }
          className="w-full h-10 px-3 rounded-lg border border-border bg-card font-bold font-mono text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
    </div>
  );
}
