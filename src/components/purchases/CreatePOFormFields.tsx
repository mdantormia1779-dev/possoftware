import React from "react";
import { Branch } from "@/types";
import { CreatePOItemFields } from "./CreatePOItemFields";
import { CreatePOPaymentFields } from "./CreatePOPaymentFields";

interface CreatePOFormFieldsProps {
  branches: Branch[];
  supplier: string;
  setSupplier: (s: string) => void;
  branchId: string;
  setBranchId: (b: string) => void;
  productName: string;
  setProductName: (p: string) => void;
  qty: number;
  setQty: (q: number) => void;
  unitCost: number;
  setUnitCost: (c: number) => void;
  paidAmount: number;
  setPaidAmount: (p: number) => void;
  batchNo: string;
  setBatchNo: (b: string) => void;
}

export function CreatePOFormFields({
  branches,
  supplier,
  setSupplier,
  branchId,
  setBranchId,
  productName,
  setProductName,
  qty,
  setQty,
  unitCost,
  setUnitCost,
  paidAmount,
  setPaidAmount,
  batchNo,
  setBatchNo,
}: CreatePOFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Select Supplier</label>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          >
            <option>Beximco Textiles Ltd.</option>
            <option>Square Consumer Products</option>
            <option>Rahim Electronics &amp; Importers</option>
            <option>Apex Footwear Ltd.</option>
            <option>PRAN-RFL Group Wholesale</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Receiving Branch</label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <CreatePOItemFields
        productName={productName}
        setProductName={setProductName}
        qty={qty}
        setQty={setQty}
        unitCost={unitCost}
        setUnitCost={setUnitCost}
      />

      <CreatePOPaymentFields
        paidAmount={paidAmount}
        setPaidAmount={setPaidAmount}
        batchNo={batchNo}
        setBatchNo={setBatchNo}
      />
    </>
  );
}
