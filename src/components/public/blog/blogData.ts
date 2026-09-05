export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  highlight: boolean;
}

export const ARTICLES: Article[] = [
  {
    id: "nbr-vat-mushak-6-3-compliance",
    title: "NBR VAT Mushak-6.3 Digital Invoicing: How to Stay 100% Tax Compliant in 2026",
    summary:
      "A complete guide for Bangladeshi retail, restaurant, and supermarket owners navigating the latest National Board of Revenue VAT rules with automated software generation.",
    category: "NBR VAT & Legal",
    author: "Kazi Farhan, Tax & Compliance Lead",
    date: "18 Aug 2026",
    readTime: "6 min read",
    highlight: true,
  },
  {
    id: "offline-first-pos-why-it-matters",
    title: "The Truth About Cloud ERPs in Bangladesh: Why Offline-First Architecture is Non-Negotiable",
    summary:
      "When load-shedding strikes or fiber lines get cut during peak sales hours, can your cashier still scan barcodes and print receipts? Here's why local IndexedDB storage saves businesses.",
    category: "Technology & POS",
    author: "Tanvir Hasan, Principal Architect",
    date: "12 Aug 2026",
    readTime: "8 min read",
    highlight: false,
  },
  {
    id: "multi-branch-stock-transfers",
    title: "Multi-Branch Inventory Control: Ending Stock Discrepancies Between Outlets",
    summary:
      "Learn how top fashion boutiques and electronics chains in Dhaka eliminate ghost inventory, track transit dispatch, and maintain accurate gross margins across 10+ showrooms.",
    category: "Inventory & Supply Chain",
    author: "Nabila Sultana, Operations Consultant",
    date: "04 Aug 2026",
    readTime: "5 min read",
    highlight: false,
  },
  {
    id: "bkash-nagad-pos-integration",
    title: "Dynamic bKash & Nagad QR at the Cash Counter: Increasing Checkout Velocity by 40%",
    summary:
      "Manual phone number entry at checkout causes line congestion and input errors. Dynamic QR codes printed on the POS customer screen streamline digital transactions in seconds.",
    category: "Fintech & Payments",
    author: "Zubair Rahman, Fintech Specialist",
    date: "28 Jul 2026",
    readTime: "4 min read",
    highlight: false,
  },
  {
    id: "fmcg-batch-expiry-management",
    title: "Supermarket Batch & Expiration Management: Slashing FMCG Spoilage by 85%",
    summary:
      "How proactive 30/60/90-day expiry tracking and First-Expired-First-Out (FEFO) algorithms protect grocery margins and prevent selling near-expiry goods to consumers.",
    category: "Supermarket & Retail",
    author: "Sadia Chowdhury, Retail Strategy",
    date: "19 Jul 2026",
    readTime: "7 min read",
    highlight: false,
  },
  {
    id: "retail-staff-commissions",
    title: "Sales Commission Automation: Boosting Staff Retention and In-Store Conversions",
    summary:
      "Manual paper-based commission calculations create disputes and delays. See how linking salesperson IDs directly to barcode sales transactions transforms sales culture.",
    category: "HR & Payroll",
    author: "Aminul Islam, HR Technology",
    date: "10 Jul 2026",
    readTime: "5 min read",
    highlight: false,
  },
];
