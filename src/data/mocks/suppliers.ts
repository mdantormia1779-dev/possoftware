import { Supplier } from "@/types";

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "supp-1",
    organizationId: "org-1",
    name: "Bengal Textile & Spinning Mills",
    companyName: "Bengal Group of Industries",
    phone: "+880 1713-112233",
    email: "orders@bengaltextiles.com.bd",
    address: "Tejgaon I/A, Dhaka-1208",
    balanceDue: 45000,
    totalPurchased: 480000,
  },
  {
    id: "supp-2",
    organizationId: "org-1",
    name: "Narayanganj Yarn & Weaving Hub",
    companyName: "Narayanganj Fabrics Ltd.",
    phone: "+880 1818-445566",
    email: "sales@nganjfabrics.com",
    address: "Tanbazar, Narayanganj",
    balanceDue: 0,
    totalPurchased: 310000,
  },
  {
    id: "supp-3",
    organizationId: "org-1",
    name: "Apex Footwear & Leather Supply",
    companyName: "Apex Tannery Partner",
    phone: "+880 1914-778899",
    email: "b2b@apexpartners.com.bd",
    address: "Hazaribagh, Dhaka",
    balanceDue: 18500,
    totalPurchased: 220000,
  },
];

