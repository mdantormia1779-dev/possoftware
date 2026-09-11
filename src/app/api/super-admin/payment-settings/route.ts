import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

const DEFAULT_METHODS = [
  {
    method: "BKASH",
    name: "bKash Merchant Payment",
    accountType: "Merchant",
    accountNumber: "01700123456",
    instructions: "1. Open bKash App and select Make Payment\n2. Enter Merchant Number: 01700123456\n3. Enter Plan Amount & Reference (Org Name)\n4. Enter your PIN to confirm and copy the TrxID below.",
    isActive: true,
    sortOrder: 1,
  },
  {
    method: "NAGAD",
    name: "Nagad Corporate / Merchant",
    accountType: "Merchant",
    accountNumber: "01800123456",
    instructions: "1. Open Nagad App and select Merchant Pay\n2. Enter Number: 01800123456\n3. Enter Plan Amount & Reference (Org Name)\n4. Enter PIN to confirm and copy the TrxID below.",
    isActive: true,
    sortOrder: 2,
  },
  {
    method: "ROCKET",
    name: "DBBL Rocket Payment",
    accountType: "Merchant",
    accountNumber: "019001234567",
    instructions: "1. Dial *322# or open Rocket App\n2. Select Merchant Pay\n3. Enter Biller ID / Number: 019001234567\n4. Complete payment and enter Transaction ID below.",
    isActive: true,
    sortOrder: 3,
  },
  {
    method: "BANK",
    name: "City Bank Corporate Wire",
    accountType: "Corporate",
    accountNumber: "1502938475001",
    bankName: "City Bank PLC",
    branchName: "Principal Branch, Motijheel, Dhaka",
    routingNumber: "225271234",
    instructions: "Transfer to City Bank A/C: 1502938475001 (XYZ Business OS Ltd.). Enter Deposit Slip No or Trx Reference below.",
    isActive: true,
    sortOrder: 4,
  },
];

export async function GET() {
  try {
    let settings = await prisma.platformPaymentConfig.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (settings.length === 0) {
      await prisma.platformPaymentConfig.createMany({ data: DEFAULT_METHODS });
      settings = await prisma.platformPaymentConfig.findMany({
        orderBy: { sortOrder: "asc" },
      });
    }
    return apiSuccess(settings);
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch payment settings", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const b = await req.json();
    if (!b.id) return apiError("Payment setting ID is required", 400);

    const updated = await prisma.platformPaymentConfig.update({
      where: { id: b.id },
      data: {
        name: b.name,
        accountType: b.accountType,
        accountNumber: b.accountNumber,
        bankName: b.bankName,
        branchName: b.branchName,
        routingNumber: b.routingNumber,
        instructions: b.instructions,
        isActive: b.isActive !== undefined ? Boolean(b.isActive) : undefined,
        sortOrder: b.sortOrder !== undefined ? Number(b.sortOrder) : undefined,
      },
    });
    return apiSuccess(updated, "Payment settings updated successfully");
  } catch (err: any) {
    return apiError(err.message || "Failed to update payment setting", 500);
  }
}
