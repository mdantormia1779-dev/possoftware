import React from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CampaignFormFields } from "./CampaignFormFields";

export interface NewCampaignForm {
  title: string;
  channel: "sms" | "whatsapp";
  targetAudience: string;
  message: string;
}

interface CreateCampaignModalProps {
  show: boolean;
  onClose: () => void;
  newCamp: NewCampaignForm;
  setNewCamp: React.Dispatch<React.SetStateAction<NewCampaignForm>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateCampaignModal({
  show,
  onClose,
  newCamp,
  setNewCamp,
  onSubmit,
}: CreateCampaignModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Compose Broadcast Campaign</h3>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <CampaignFormFields newCamp={newCamp} setNewCamp={setNewCamp} />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              <Send className="h-3.5 w-3.5 mr-1.5" /> Broadcast Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
