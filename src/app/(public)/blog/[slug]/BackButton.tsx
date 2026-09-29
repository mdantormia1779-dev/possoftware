"use client";

import React, { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";

interface ShareButtonProps {
  title?: string;
}

const iconBtn =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800";

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
      // Clipboard permission denied
    }
  };

  const handleSocialShare = (platform: "twitter" | "linkedin" | "facebook") => {
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
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfeafc]/70 text-[#0a60d9] dark:bg-blue-950/50 dark:text-blue-400">
          <Share2 className="h-[18px] w-[18px]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Share this article
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pass it on to someone who needs it.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleSocialShare("facebook")}
          aria-label="Share on Facebook"
          className={`${iconBtn} hover:text-[#1877F2]`}
        >
          <FaFacebookF className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialShare("linkedin")}
          aria-label="Share on LinkedIn"
          className={`${iconBtn} hover:text-[#0A66C2]`}
        >
          <FaLinkedinIn className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialShare("twitter")}
          aria-label="Share on X"
          className={`${iconBtn} hover:text-slate-900 dark:hover:text-white`}
        >
          <FaXTwitter className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link"
          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Copied!
              </span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}