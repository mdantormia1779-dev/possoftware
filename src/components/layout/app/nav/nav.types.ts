import React from "react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
