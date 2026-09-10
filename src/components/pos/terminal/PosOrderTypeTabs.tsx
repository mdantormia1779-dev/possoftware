import React, { useState } from "react";
import { UtensilsCrossed, ShoppingBag, Truck } from "lucide-react";

export type OrderType = "dine_in" | "take_away" | "delivery";

interface PosOrderTypeTabsProps {
  orderType?: OrderType;
  onChangeOrderType?: (type: OrderType) => void;
}

export function PosOrderTypeTabs({ orderType: controlledType, onChangeOrderType }: PosOrderTypeTabsProps) {
  const [internalType, setInternalType] = useState<OrderType>("dine_in");
  const current = controlledType ?? internalType;

  const handleSelect = (type: OrderType) => {
    setInternalType(type);
    onChangeOrderType?.(type);
  };

  const tabs: Array<{ id: OrderType; label: string; icon: React.ReactNode }> = [
    { id: "dine_in", label: "Dine In", icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
    { id: "take_away", label: "Take Away", icon: <ShoppingBag className="h-3.5 w-3.5" /> },
    { id: "delivery", label: "Delivery", icon: <Truck className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="px-4 py-2 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-xs font-semibold">
        {tabs.map((tab) => {
          const isActive = current === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelect(tab.id)}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.icon}
              <span className="text-[11px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
