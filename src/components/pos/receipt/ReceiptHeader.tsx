import React from "react";
import { Organization } from "@/types";

interface ReceiptHeaderProps {
  organization: Organization;
}

export const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ organization }) => {
  return (
    <div className="text-center space-y-1 border-b border-dashed border-neutral-400 pb-3">
      <div className="font-bold text-sm uppercase tracking-wider text-black">
        {organization.name}
      </div>
      <div className="text-[10px] text-neutral-600 leading-tight">
        {organization.address}
      </div>
      <div className="text-[10px] text-neutral-600 font-mono">
        Tel: {organization.phone}
      </div>
      {organization.taxNumber && (
        <div className="text-[10px] font-semibold text-neutral-800">
          BIN / VAT Reg: {organization.taxNumber}
        </div>
      )}
      <div className="text-[10px] font-bold mt-1.5 uppercase bg-neutral-100 text-neutral-800 py-0.5 px-2 rounded inline-block">
        MUSHAK-6.3 / RETAIL INVOICE
      </div>
    </div>
  );
};
