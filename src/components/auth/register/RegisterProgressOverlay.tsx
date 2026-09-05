"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";

interface RegisterProgressOverlayProps {
  isLoading: boolean;
  setupPhase: string;
}

export function RegisterProgressOverlay({
  isLoading,
  setupPhase,
}: RegisterProgressOverlayProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 bg-card/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 space-y-3 rounded-3xl"
    >
      <div className="relative">
        <div className="h-14 w-14 rounded-2xl bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center animate-spin">
          <Layers className="h-7 w-7" />
        </div>
        <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-bounce" />
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground">Setting Up Your Workspace</h3>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium animate-pulse mt-1">
          {setupPhase}
        </p>
      </div>
    </motion.div>
  );
}
