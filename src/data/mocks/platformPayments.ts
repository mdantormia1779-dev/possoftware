export interface PlatformPaymentMethod {
  id: string;
  method: string;
  name: string;
  accountType: string;
  accountNumber: string;
  bankName?: string | null;
  branchName?: string | null;
  routingNumber?: string | null;
  instructions?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export const DEFAULT_PLATFORM_PAYMENT_METHODS: PlatformPaymentMethod[] = [
  {
    id: "cfg-bkash-01", method: "BKASH", name: "bKash Merchant Payment", accountType: "Merchant",
    accountNumber: "01700123456", isActive: true, sortOrder: 1,
    instructions: "1. Open bKash App & select Make Payment\n2. Enter Merchant: 01700123456\n3. Enter Plan Amount & Reference\n4. Copy TrxID.",
  },
  {
    id: "cfg-nagad-02", method: "NAGAD", name: "Nagad Corporate / Merchant", accountType: "Merchant",
    accountNumber: "01800123456", isActive: true, sortOrder: 2,
    instructions: "1. Open Nagad App & select Merchant Pay\n2. Enter: 01800123456\n3. Enter Amount & Reference\n4. Copy TrxID.",
  },
  {
    id: "cfg-rocket-03", method: "ROCKET", name: "DBBL Rocket Payment", accountType: "Merchant",
    accountNumber: "019001234567", isActive: true, sortOrder: 3,
    instructions: "1. Dial *322# or open Rocket App\n2. Select Merchant Pay\n3. Enter Biller ID: 019001234567\n4. Copy TrxID.",
  },
  {
    id: "cfg-bank-04", method: "BANK", name: "City Bank Corporate Wire", accountType: "Corporate",
    accountNumber: "1502938475001", bankName: "City Bank PLC", branchName: "Principal Branch, Motijheel, Dhaka",
    routingNumber: "225271234", isActive: true, sortOrder: 4,
    instructions: "Transfer to City Bank A/C: 1502938475001 (XYZ Business OS Ltd.). Enter Deposit Slip No or Trx Reference.",
  },
];

export const INITIAL_SUBSCRIPTION_INVOICES = [
  {
    id: "sub-inv-01",
    invoiceNumber: "SUB-878657",
    amount: 14999,
    billingCycle: "MONTHLY",
    paymentMethod: "BKASH",
    transactionId: "BK992837482",
    planTier: "ENTERPRISE",
    senderNumber: "01700123456",
    notes: "Enterprise plan upgrade via bKash merchant",
    status: "PENDING",
    createdAt: new Date().toISOString(),
    organization: {
      id: "org-1",
      name: "Rahman Fashion & Lifestyle",
      phone: "+880 1711-223344",
      email: "contact@rahmanfashion.com.bd",
    },
  },
  {
    id: "sub-inv-02",
    invoiceNumber: "SUB-878658",
    amount: 6999,
    billingCycle: "MONTHLY",
    paymentMethod: "NAGAD",
    transactionId: "NG782910384",
    planTier: "BUSINESS",
    senderNumber: "01819-998877",
    notes: "Monthly business renewal",
    status: "PAID",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    organization: {
      id: "org-2",
      name: "Noor Supermarket & Grocery",
      phone: "+880 1819-998877",
      email: "support@noorgrocery.com",
    },
  },
];
