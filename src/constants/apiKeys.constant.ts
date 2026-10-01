export const LOGIN_KEY = ["login"] as const;

export const PROFILE_KEY = ["profile"] as const;

export const DASHBOARD_KEYS = {
  summary: ["dashboard", "summary", "filter"] as const,
  status: ["dashboard", "status", "summary", "filter"] as const,
  expense_income: ["dashboard", "expense_income", "summary"] as const,
};

export const USER_KEYS = {
  all: ["users"] as const,
  detail: (id: number) => ["users", "detail", id] as const,
};
export const CUSTOMER_KEYS = {
  all: ["customers"] as const,
  codes: ["customers", "codes"] as const,
  detail: (id: number) => ["customers", "detail", id] as const,
};

export const MASTER_KEYS = {
  departments: ["masters", "departments"],
  designations: ["masters", "designations"],
};

export const LOAN_KEYS = {
  all: ["loans"] as const,
  emis: ["loans", "emis"] as const,
  detail: (id: number) => ["loans", "detail", id] as const,
  collectors: "loan-detail-collectors" as const,
  customers: "loan-detail-customers" as const,
};

export const EMI_COLLECTION_KEYS = {
  all: ["emi-collections"] as const,
};

export const EMI_FOLLOWUP_KEYS = {
  all: ["emi-followups"] as const,
};
