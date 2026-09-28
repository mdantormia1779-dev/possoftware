export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
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
    content: `The National Board of Revenue (NBR) has tightened enforcement around Mushak-6.3 digital invoicing, and businesses that fail to comply face penalties and audit risk.

In this guide, we break down what has changed, who is affected, and how automated POS software can generate compliant invoices without manual intervention.

Key points covered:
- What Mushak-6.3 actually requires
- Which business categories must comply in 2026
- How real-time invoice generation works inside a POS system
- Common mistakes that trigger NBR audits`,
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
    content: `Most cloud-only POS systems fail the moment the internet drops — and in Bangladesh, that happens more often than vendors admit.

Offline-first architecture means the cashier can keep scanning barcodes, printing receipts, and closing sales even during load-shedding or a fiber cut, with everything syncing back to the cloud once connectivity returns.

Why this matters:
- Zero downtime during peak sales hours
- No lost transactions when the network drops
- Local IndexedDB storage keeps the register responsive
- Automatic background sync once the connection is back`,
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
    content: `Running more than one outlet multiplies the chance of stock discrepancies — items marked as available that don't actually exist on the shelf, or transfers that vanish somewhere between branches.

This article walks through how growing retail chains in Dhaka solved this with proper transit tracking and centralized stock visibility.

What you'll learn:
- How to track stock in transit between branches
- Setting up approval workflows for inter-branch transfers
- Reconciling gross margins across multiple showrooms
- Eliminating "ghost inventory" with real-time stock counts`,
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
    content: `Typing a customer's phone number manually at checkout is slow and error-prone — and during rush hours, it directly causes queue buildup.

Dynamic QR codes generated per-transaction and shown on the customer-facing display solve this by letting shoppers scan and pay in seconds, with the amount pre-filled automatically.

Highlights:
- How dynamic QR generation works per transaction
- Reducing checkout time by up to 40%
- Cutting down manual entry errors
- Integrating bKash and Nagad directly into the POS flow`,
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
    content: `FMCG spoilage quietly eats into supermarket margins every month — often because expiry dates aren't tracked until it's too late.

This article explains how a First-Expired-First-Out (FEFO) system, combined with proactive 30/60/90-day alerts, helps supermarkets clear stock before it expires and stay compliant with consumer protection rules.

Covered in this guide:
- Setting up batch-level expiry tracking
- How FEFO differs from FIFO and why it matters for groceries
- Automated alerts at the 30/60/90-day thresholds
- Real spoilage reduction numbers from supermarket case studies`,
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
    content: `Paper-based commission tracking creates disputes, delays payouts, and demotivates sales staff — all of which hurt in-store conversions.

By linking a salesperson ID directly to each barcode-scanned transaction, commissions are calculated automatically and transparently, in real time.

What changes for your team:
- Automatic commission calculation per sale
- Transparent, disputable-free payout records
- Real-time leaderboards that motivate staff
- Direct integration with payroll for month-end payouts`,
    category: "HR & Payroll",
    author: "Aminul Islam, HR Technology",
    date: "10 Jul 2026",
    readTime: "5 min read",
    highlight: false,
  },
];