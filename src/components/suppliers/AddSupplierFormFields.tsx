import React from "react";

interface AddSupplierFormFieldsProps {
  formData: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
  };
  setFormData: (val: any) => void;
}

export function AddSupplierFormFields({
  formData,
  setFormData,
}: AddSupplierFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Supplier / Contact Person Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Bengal Textile Mills"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-foreground">Company / Group Name</label>
        <input
          type="text"
          placeholder="e.g. Bengal Group Ltd."
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Phone Number</label>
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
            placeholder="orders@supplier.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-foreground">Factory / Office Address</label>
        <input
          type="text"
          placeholder="Tejgaon I/A, Dhaka"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
    </div>
  );
}
