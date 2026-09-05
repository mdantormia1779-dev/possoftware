"use client";

import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsNav } from "@/components/settings/SettingsNav";
import { SettingsTabContent } from "@/components/settings/SettingsTabContent";
import { useSettingsState } from "@/components/settings/useSettingsState";

export default function SettingsPage() {
  const state = useSettingsState();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SettingsHeader savedToast={state.savedToast} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <SettingsNav
          activeTab={state.activeTab}
          onTabChange={state.setActiveTab}
        />

        <div className="md:col-span-9">
          <form onSubmit={state.handleSave} className="space-y-6">
            <SettingsTabContent {...state} />

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="submit" variant="primary" size="lg" className="px-8 font-bold">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
