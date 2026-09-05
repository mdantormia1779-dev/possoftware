import { Organization, Branch } from "@/types";
import { INITIAL_ORGANIZATIONS, INITIAL_BRANCHES } from "@/data/initial-data";
import { STORAGE_KEYS, getItem, setItem } from "./baseStorage";

export class TenantStorage {
  public getOrganizations(): Organization[] {
    return getItem(STORAGE_KEYS.ORGANIZATIONS, INITIAL_ORGANIZATIONS);
  }

  public getOrganizationById(id: string): Organization | undefined {
    return this.getOrganizations().find((o) => o.id === id);
  }

  public addOrganization(org: Organization): void {
    const orgs = [org, ...this.getOrganizations()];
    setItem(STORAGE_KEYS.ORGANIZATIONS, orgs);
  }

  public updateOrganization(org: Organization): void {
    const orgs = this.getOrganizations().map((o) => (o.id === org.id ? org : o));
    setItem(STORAGE_KEYS.ORGANIZATIONS, orgs);
  }

  public deleteOrganization(id: string): void {
    const orgs = this.getOrganizations().filter((o) => o.id !== id);
    setItem(STORAGE_KEYS.ORGANIZATIONS, orgs);
    const branches = this.getBranches().filter((b) => b.organizationId !== id);
    setItem(STORAGE_KEYS.BRANCHES, branches);
  }

  public purgeOrganizationData(id: string): void {
    const sales = getItem<any[]>(STORAGE_KEYS.SALES, []).filter((s) => s.organizationId !== id);
    setItem(STORAGE_KEYS.SALES, sales);
    const customers = getItem<any[]>(STORAGE_KEYS.CUSTOMERS, []).map((c) =>
      c.organizationId === id ? { ...c, dueBalance: 0 } : c
    );
    setItem(STORAGE_KEYS.CUSTOMERS, customers);
  }

  public getBranches(): Branch[] {
    return getItem(STORAGE_KEYS.BRANCHES, INITIAL_BRANCHES);
  }

  public addBranch(branch: Branch): void {
    const branches = [branch, ...this.getBranches()];
    setItem(STORAGE_KEYS.BRANCHES, branches);
  }
}

export const tenantStorage = new TenantStorage();
