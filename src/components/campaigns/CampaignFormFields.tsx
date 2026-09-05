import React from "react";
import { NewCampaignForm } from "./CreateCampaignModal";

interface CampaignFormFieldsProps {
  newCamp: NewCampaignForm;
  setNewCamp: React.Dispatch<React.SetStateAction<NewCampaignForm>>;
}

export function CampaignFormFields({ newCamp, setNewCamp }: CampaignFormFieldsProps) {
  return (
    <>
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Campaign Title</label>
        <input
          type="text"
          required
          placeholder="e.g. Pohela Boishakh 1433 Flash Sale"
          value={newCamp.title}
          onChange={(e) => setNewCamp((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full h-9 px-3 rounded-lg border border-border bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Broadcast Channel</label>
          <select
            value={newCamp.channel}
            onChange={(e) => setNewCamp((prev) => ({ ...prev, channel: e.target.value as any }))}
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
            onChange={(e) => setNewCamp((prev) => ({ ...prev, targetAudience: e.target.value }))}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background font-medium"
          >
            <option>All Registered Customers (650)</option>
            <option>VIP Loyalty Members (400+ Pts)</option>
            <option>Inactive (No purchase in 60 days)</option>
            <option>Dhanmondi &amp; Mirpur Outlet Customers</option>
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
          onChange={(e) => setNewCamp((prev) => ({ ...prev, message: e.target.value }))}
          className="w-full p-2.5 rounded-lg border border-border bg-background"
        />
        <span className="text-[10px] text-muted-foreground block text-right">
          Approx Cost: ৳227.50 (650 SMS @ ৳0.35)
        </span>
      </div>
    </>
  );
}
