"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Clock,
  Search,
  CheckCircle2,
  Package,
  Sparkles,
  Tag,
  ArrowRight,
  TrendingUp,
  MapPin,
  Check,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";

export function StaffDashboard() {
  const { currentBranch } = useTenant();
  const products = storageService.getProducts();

  const [isClockedIn, setIsClockedIn] = useState(true);
  const [productQuery, setProductQuery] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Verify sale price tags on summer collection rack", done: true },
    { id: 2, text: "Restock denim jeans sizes 32 & 34 on floor display", done: true },
    { id: 3, text: "Inspect fitting room return hangers & return to rack", done: false },
    { id: 4, text: "Evening shelf alignment & customer assistance", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // Filtered product lookup
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
      {/* Staff Attendance & Shift Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-200/80 dark:border-purple-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300">
              <Users className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-foreground">
              Store Floor Staff • {currentBranch.name}
            </h2>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                isClockedIn
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isClockedIn ? "● Shift Active (Clocked In)" : "○ Off Duty"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shift: Morning Retail • Check-in: 09:15 AM • Department: Apparel &amp; Footwear
          </p>
        </div>

        <Button
          onClick={() => setIsClockedIn(!isClockedIn)}
          variant={isClockedIn ? "outline" : "primary"}
          className="text-xs font-bold shrink-0"
        >
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          <span>{isClockedIn ? "Clock Out" : "Clock In to Shift"}</span>
        </Button>
      </div>

      {/* 4 Staff Shift Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Shift Time Elapsed"
          value="4h 35m"
          change="Ends at 06:00 PM"
          isPositive={true}
          icon={Clock}
          description="Standard 8-hour roster"
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />

        <StatCard
          title="Floor Tasks"
          value={`${tasks.filter((t) => t.done).length} / ${tasks.length}`}
          change="50% Completed"
          isPositive={true}
          icon={CheckCircle2}
          description="Daily store checklist"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Catalog SKUs"
          value={products.length}
          change="Live In Stock"
          isPositive={true}
          icon={Package}
          description="Searchable at counter"
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Sales Assisted"
          value="18 Orders"
          change="Top Floor Associate"
          isPositive={true}
          icon={TrendingUp}
          description="Customer assistance"
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconTextColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Instant Floor Product & Price Checker + Store Floor Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Instant Stock & Price Lookup */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Instant Stock &amp; Price Checker
            </h3>
            <p className="text-xs text-muted-foreground">
              Quickly check price and stock availability across branches for shoppers
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name, SKU or barcode..."
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/80 bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-muted/20 border border-border/60 flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <div className="font-bold text-foreground text-xs truncate">{p.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                      SKU: {p.sku} • Barcode: {p.barcode || "N/A"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-black text-sm text-foreground">
                      {formatCurrency(p.sellingPrice)}
                    </div>
                    <span
                      className={`text-[10px] font-bold ${
                        p.totalStock > 5 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600"
                      }`}
                    >
                      {p.totalStock} in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/60 text-center space-y-1">
              <span className="text-base">📦</span>
              <p className="text-xs text-muted-foreground">
                Type product name to answer customer queries instantly
              </p>
            </div>
          )}
        </div>

        {/* Daily Shift Checklist */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Daily Floor Operations Checklist
            </h3>
            <p className="text-xs text-muted-foreground">
              Assigned floor tasks for your morning roster
            </p>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  task.done
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60"
                    : "bg-muted/20 border-border/60 hover:bg-muted/40"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    task.done
                      ? "bg-emerald-600 text-white"
                      : "border border-muted-foreground/40 bg-card"
                  }`}
                >
                  {task.done && <Check className="h-3 w-3" />}
                </div>
                <span
                  className={`text-xs ${
                    task.done ? "line-through text-muted-foreground" : "font-medium text-foreground"
                  }`}
                >
                  {task.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
