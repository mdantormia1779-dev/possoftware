"use client";

import React, { useState } from "react";
import { Link2, Check } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";

interface ShareButtonProps {
  title?: string;
}

export function ShareButton({ title = "Check out this article" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — ignore
    }
  };

  const handleSocialShare = (platform: "twitter" | "linkedin" | "facebook") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full border border-border/80 bg-background/80 backdrop-blur-xs shadow-xs">
      <button
        type="button"
        onClick={() => handleSocialShare("twitter")}
        aria-label="Share on X"
        className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer"
      >
        <FaXTwitter className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleSocialShare("linkedin")}
        aria-label="Share on LinkedIn"
        className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer"
      >
        <FaLinkedinIn className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleSocialShare("facebook")}
        aria-label="Share on Facebook"
        className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer"
      >
        <FaFacebookF className="h-3.5 w-3.5" />
      </button>

      <div className="h-4 w-px bg-border/60 mx-0.5" />

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500 animate-in zoom-in-50" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}