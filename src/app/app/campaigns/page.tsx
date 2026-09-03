"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Campaign } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  Megaphone,
  Plus,
  Send,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowLeft,
  X,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function MarketingCampaignsPage() {
  const { currentOrg } = useTenant();
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => storageService.getCampaigns());
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCamp, setNewCamp] = useState({
    title: "",
    channel: "sms" as "sms" | "whatsapp",
    targetAudience: "All Registered Customers",
    message: "",
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.title || !newCamp.message) return;

    const created: Campaign = {
      id: `cmp-${Date.now()}`,
      organizationId: currentOrg.id,
      title: newCamp.title,
      channel: newCamp.channel,
      targetAudience: newCamp.targetAudience,
      message: newCamp.message,
      recipientCount: 650,
      sentCount: 650,
      status: "sent",
      scheduledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    storageService.addCampaign(created);
    setCampaigns(storageService.getCampaigns());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/customers" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Broadcast Marketing Campaigns</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Launch bulk SMS and WhatsApp festive promotions (৳0.35/SMS) directly to customer cohorts
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Send className="h-4 w-4 mr-1" /> Launch New Campaign
        </Button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">{camp.title}</h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Audience: {camp.targetAudience}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-muted text-foreground">
                    {camp.channel}
                  </span>
                  <StatusBadge status={camp.status} />
                </div>
              </div>

              {/* Message Box */}
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs leading-relaxed text-foreground font-sans">
                &ldquo;{camp.message}&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-card border border-border">
                  <span className="text-[10px] text-muted-foreground block">Recipients Reached</span>
                  <strong className="text-foreground">{camp.recipientCount} Customers</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-border">
                  <span className="text-[10px] text-muted-foreground block">Broadcast Date</span>
                  <strong className="text-foreground">{formatDate(camp.createdAt)}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
              <span>Channel Delivery: 99.4%</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Launch Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Compose Broadcast Campaign</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pohela Boishakh 1433 Flash Sale"
                  value={newCamp.title}
                  onChange={(e) => setNewCamp({ ...newCamp, title: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Broadcast Channel</label>
                  <select
                    value={newCamp.channel}
                    onChange={(e) => setNewCamp({ ...newCamp, channel: e.target.value as any })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-medium"
                  >
                    <option value="sms">SMS (Masking: RAHMAN-F)</option>
                    <option value="whatsapp">WhatsApp Business API</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Target Audience</label>
                  <select
                    value={newCamp.targetAudience}
                    onChange={(e) => setNewCamp({ ...newCamp, targetAudience: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-medium"
                  >
                    <option>All Registered Customers (650)</option>
                    <option>VIP Loyalty Members (400+ Pts)</option>
                    <option>Inactive (No purchase in 60 days)</option>
                    <option>Dhanmondi & Mirpur Outlet Customers</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Broadcast Message Body</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Special Offer: Enjoy 20% off on all items this weekend across all our retail outlets! Use code SAVE20 at checkout."
                  value={newCamp.message}
                  onChange={(e) => setNewCamp({ ...newCamp, message: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background"
                />
                <span className="text-[10px] text-muted-foreground block text-right">
                  Approx Cost: ৳227.50 (650 SMS @ ৳0.35)
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Broadcast Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
