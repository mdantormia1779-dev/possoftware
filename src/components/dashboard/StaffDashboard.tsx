"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { StaffAttendanceBanner } from "./staff/StaffAttendanceBanner";
import { StaffKpis } from "./staff/StaffKpis";
import { StaffPriceChecker } from "./staff/StaffPriceChecker";
import { StaffOperationsChecklist, TaskItem } from "./staff/StaffOperationsChecklist";

export function StaffDashboard() {
  const { currentBranch } = useTenant();
  const products = storageService.getProducts();

  const [isClockedIn, setIsClockedIn] = useState(true);
  const [productQuery, setProductQuery] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: "Verify sale price tags on summer collection rack", done: true },
    { id: 2, text: "Restock denim jeans sizes 32 & 34 on floor display", done: true },
    { id: 3, text: "Inspect fitting room return hangers & return to rack", done: false },
    { id: 4, text: "Evening shelf alignment & customer assistance", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const searchResults = productQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(productQuery.toLowerCase().trim()) ||
            p.sku.toLowerCase().includes(productQuery.toLowerCase().trim()) ||
            p.barcode?.includes(productQuery.trim())
        )
        .slice(0, 4)
    : [];

  return (
    <div className="space-y-6">
      <StaffAttendanceBanner
        branchName={currentBranch.name}
        isClockedIn={isClockedIn}
        onToggleClock={() => setIsClockedIn(!isClockedIn)}
      />

      <StaffKpis
        completedTasksCount={tasks.filter((t) => t.done).length}
        totalTasksCount={tasks.length}
        skusCount={products.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <StaffPriceChecker
          productQuery={productQuery}
          setProductQuery={setProductQuery}
          searchResults={searchResults}
        />
        <StaffOperationsChecklist tasks={tasks} toggleTask={toggleTask} />
      </div>
    </div>
  );
}
