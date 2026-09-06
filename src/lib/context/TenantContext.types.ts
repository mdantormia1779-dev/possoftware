import {
  Organization,
  Branch,
  UserRole,
  User,
  CartItem,
  Product,
  Customer,
  Sale,
  SyncQueueItem,
  NotificationItem,
} from "../types";

export interface TenantContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentOrg: Organization;
  setCurrentOrg: (org: Organization) => void;
  currentBranch: Branch;
  setCurrentBranch: (branch: Branch) => void;
  branches: Branch[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  syncQueue: SyncQueueItem[];
  isSyncing: boolean;
  triggerManualSync: () => Promise<void>;
  cart: CartItem[];
  cartCustomer: Customer | null;
  setCartCustomer: (customer: Customer | null) => void;
  cartDiscount: number;
  setCartDiscount: (discount: number) => void;
  cartTaxRate: number;
  setCartTaxRate: (rate: number) => void;
  addToCart: (product: Product, qty?: number) => void;
  updateCartItemQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalTax: number;
  cartGrandTotal: number;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isSyncModalOpen: boolean;
  setIsSyncModalOpen: (open: boolean) => void;
  activeReceiptSale: Sale | null;
  setActiveReceiptSale: (sale: Sale | null) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  refreshData: () => void;
}
