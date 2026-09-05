import React from "react";
import Link from "next/link";

interface SuperAdminBannerProps {
  orgName: string;
}

export function SuperAdminBanner({ orgName }: SuperAdminBannerProps) {
  const handleExit = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("super_admin_controlling");
      localStorage.removeItem("super_admin_controlling_name");
      localStorage.setItem("xyz_user_role", "super_admin");
    }
    window.location.href = "/super-admin/organizations";
  };

  return (
    <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 text-white px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-purple-700/60 shadow-md z-50">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="truncate">
          🛡️ Super Admin Control: Currently managing{" "}
          <strong className="text-white underline">{orgName}</strong> as Executive Owner.
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/super-admin/organizations"
          className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black shadow transition-all active:scale-95"
        >
          Console
        </Link>
        <button
          onClick={handleExit}
          className="px-2.5 py-1 rounded-xl border border-white/20 hover:bg-white/10 text-[11px] font-semibold text-purple-200 hover:text-white transition-colors"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
