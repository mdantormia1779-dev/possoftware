# STRICT MODULAR COMPONENT ARCHITECTURE RULE

From now on, follow a **strict modular component architecture** for this entire project.

The goal is to keep the codebase clean, scalable, maintainable and easy to debug.

## 🚨 HARD RULE: 100-LINE LIMIT

**NO SINGLE COMPONENT, PAGE, HOOK, UTILITY OR LOGIC FILE SHOULD EXCEED 100 LINES OF CODE.**

This is a strict requirement.

If a file approaches 100 lines, STOP adding code to that file.

Instead:

1. Identify logical sections.
2. Extract them into smaller components/functions/hooks/utils.
3. Import them into the parent file.
4. Keep the parent file under 100 lines.

### Examples

Instead of:

`Dashboard.tsx` → 500 lines ❌

Create:

`Dashboard.tsx` → <100 lines
`DashboardHeader.tsx` → <100 lines
`DashboardStats.tsx` → <100 lines
`SalesChart.tsx` → <100 lines
`RevenueChart.tsx` → <100 lines
`RecentOrders.tsx` → <100 lines
`LowStockProducts.tsx` → <100 lines

---

# 1. PAGE COMPONENT RULE

Every page must be a composition of small components.

A page should primarily be responsible for:

* Layout
* Component composition
* Data orchestration
* Page-level state

A page should NOT contain:

* Huge JSX blocks
* Complex business logic
* Large tables
* Large forms
* Complex modals
* Large filtering systems
* API implementation
* Reusable utility functions

Example:

```tsx
export default function ProductsPage() {
  return (
    <PageLayout>
      <ProductsHeader />
      <ProductsFilters />
      <ProductsTable />
      <ProductPagination />
      <ProductModal />
    </PageLayout>
  );
}
```

Keep it simple.

---

# 2. COMPONENT SIZE RULE

Every component should have ONE clear responsibility.

Bad:

```text
ProductPage.tsx
- Header
- Search
- Filters
- Table
- Pagination
- Modal
- Form
- API logic
- Validation
- Business logic
```

Good:

```text
ProductPage
├── ProductHeader
├── ProductSearch
├── ProductFilters
├── ProductTable
│   ├── ProductTableHeader
│   ├── ProductTableRow
│   └── ProductTableActions
├── ProductPagination
├── ProductCreateModal
│   └── ProductForm
└── ProductDeleteDialog
```

---

# 3. ONE RESPONSIBILITY PRINCIPLE

Each component should do ONE main job.

Examples:

`SearchInput.tsx`
→ Search input only.

`ProductCard.tsx`
→ Product card only.

`ProductTable.tsx`
→ Table structure only.

`ProductRow.tsx`
→ Individual row only.

`ProductForm.tsx`
→ Form structure only.

`ProductFormFields.tsx`
→ Form fields only.

`ProductModal.tsx`
→ Modal wrapper only.

---

# 4. NESTED COMPONENTS

Do NOT create giant nested JSX.

If JSX becomes complicated, extract it.

Bad:

```tsx
return (
  <div>
    <header>...</header>
    <section>
      <div>
        <table>
          ...
        </table>
      </div>
    </section>
  </div>
);
```

Instead:

```tsx
return (
  <PageLayout>
    <PageHeader />
    <ContentSection>
      <DataTable />
    </ContentSection>
  </PageLayout>
);
```

---

# 5. TABLE ARCHITECTURE

Never create a 200–500 line table component.

Break tables into:

```text
ProductTable
├── ProductTableHeader
├── ProductTableBody
├── ProductTableRow
├── ProductTableActions
└── ProductTableEmpty
```

For complex tables:

```text
components/table/
├── DataTable.tsx
├── DataTableHeader.tsx
├── DataTableBody.tsx
├── DataTableRow.tsx
├── DataTableCell.tsx
├── DataTablePagination.tsx
└── DataTableEmpty.tsx
```

Create reusable table primitives where appropriate.

---

# 6. FORM ARCHITECTURE

Never put a huge form inside a page.

Use:

```text
ProductForm
├── ProductBasicInfo
├── ProductPricing
├── ProductInventory
├── ProductCategory
├── ProductImageUpload
├── ProductStatus
└── ProductFormActions
```

For larger forms:

```text
forms/
├── ProductForm.tsx
├── ProductBasicFields.tsx
├── ProductPricingFields.tsx
├── ProductInventoryFields.tsx
└── ProductFormActions.tsx
```

---

# 7. MODAL ARCHITECTURE

Keep modal files small.

Bad:

`ProductModal.tsx` → 400 lines ❌

Good:

```text
ProductModal
├── ModalHeader
├── ProductForm
├── ProductFormFields
└── ModalFooter
```

---

# 8. CUSTOM HOOKS

Move stateful logic into custom hooks.

Examples:

```text
hooks/
├── useProducts.ts
├── useProductFilters.ts
├── useProductForm.ts
├── usePagination.ts
├── useSearch.ts
└── useModal.ts
```

Components should focus primarily on UI.

---

# 9. API LOGIC

Do NOT put API requests directly into large UI components.

Bad:

```tsx
ProductPage.tsx
- fetchProducts()
- createProduct()
- updateProduct()
- deleteProduct()
- filtering
- pagination
- UI
```

Good:

```text
services/
├── product.service.ts
├── customer.service.ts
├── inventory.service.ts
└── sales.service.ts
```

Use hooks/services to connect UI with APIs.

---

# 10. BUSINESS LOGIC

Business logic must be separated from presentation.

For example:

```text
utils/
├── calculateTotal.ts
├── calculateDiscount.ts
├── calculateTax.ts
├── formatCurrency.ts
└── formatDate.ts
```

Do not create giant utility files.

Each utility should ideally contain a small number of related functions.

---

# 11. TYPES

Keep TypeScript types organized.

Instead of putting hundreds of types inside one page:

```text
types/
├── product.ts
├── customer.ts
├── inventory.ts
├── sales.ts
├── invoice.ts
└── user.ts
```

---

# 12. CONSTANTS

Move repeated values into constants.

```text
constants/
├── navigation.ts
├── paymentMethods.ts
├── orderStatus.ts
├── permissions.ts
└── dashboard.ts
```

---

# 13. SHARED UI COMPONENTS

Create reusable design-system components.

Examples:

```text
components/ui/
├── Button.tsx
├── Input.tsx
├── Select.tsx
├── Badge.tsx
├── Card.tsx
├── Modal.tsx
├── Drawer.tsx
├── Tooltip.tsx
├── Dropdown.tsx
├── Skeleton.tsx
├── EmptyState.tsx
└── Pagination.tsx
```

Do not duplicate the same UI implementation across pages.

---

# 14. POS SCREEN ARCHITECTURE

The POS screen must be highly modular.

Recommended:

```text
POSPage
├── POSHeader
├── POSSearch
├── POSCategoryTabs
├── ProductGrid
│   └── ProductCard
├── CartPanel
│   ├── CartHeader
│   ├── CartItems
│   │   └── CartItem
│   ├── CartSummary
│   └── CheckoutButton
├── CustomerSelector
└── PaymentModal
    ├── PaymentMethods
    ├── PaymentSummary
    └── PaymentActions
```

Every component must remain under 100 lines.

---

# 15. DASHBOARD ARCHITECTURE

Use:

```text
DashboardPage
├── DashboardHeader
├── StatsGrid
│   └── StatCard
├── SalesOverview
├── RevenueChart
├── SalesChart
├── RecentOrders
├── TopProducts
└── LowStockProducts
```

Do not put all dashboard widgets inside one file.

---

# 16. FOLDER ORGANIZATION

Use a scalable structure similar to:

```text
src/
├── app/
├── pages/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── pos/
│   ├── products/
│   ├── inventory/
│   ├── customers/
│   ├── suppliers/
│   ├── sales/
│   ├── invoices/
│   └── reports/
├── hooks/
├── services/
├── utils/
├── types/
├── constants/
└── lib/
```

Adapt this structure to the existing project instead of blindly restructuring everything.

---

# 17. DO NOT OVER-ENGINEER

Componentization does NOT mean creating meaningless components.

Do NOT create:

```text
TinyWrapper.tsx
SmallDiv.tsx
TextContainer.tsx
RandomContainer.tsx
```

Only extract components when they have:

* clear responsibility
* reuse potential
* meaningful UI section
* meaningful business logic
* improved readability

---

# 18. FILE SIZE CHECK

Before finishing ANY task, inspect modified files.

If any file exceeds:

**100 lines**

refactor it.

Target:

**30–80 lines per component whenever practical.**

100 lines is the absolute maximum, not the target.

---

# 19. EXISTING CODE

Do not unnecessarily rewrite the entire project.

First inspect existing architecture.

Then:

* preserve working functionality
* preserve API integration
* preserve business logic
* preserve routes
* preserve database integration
* preserve authentication
* improve component structure
* extract reusable components
* improve maintainability

---

# 20. BEFORE CREATING NEW CODE

Always ask yourself:

> "Can this logic or UI section be extracted into a reusable component, hook, service or utility?"

If YES → extract it.

If NO → keep it in the current file.

---

# 21. FINAL VALIDATION

Before declaring the task complete:

### Check every modified file.

Verify:

* No file > 100 lines
* No giant JSX
* No duplicated components
* No duplicated business logic
* No unnecessary dependencies
* No broken imports
* No TypeScript errors
* No lint errors
* No broken routes
* No broken functionality
* No responsive issues

Run the appropriate:

* TypeScript check
* ESLint
* Build
* Tests

after the refactoring.

---

# ABSOLUTE RULE

**100 LINES MAXIMUM PER FILE.**

If a component needs more than 100 lines:

**DO NOT continue adding code.**

Stop and split it into smaller meaningful components.

The final codebase must be:

**Modular + Clean + Reusable + Maintainable + Scalable + Production-Ready.**
