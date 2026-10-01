import { OptionItem } from "@/types";

// Filter keys
export const FILTER_KEYS = {
  SEARCH: "search",
  STATUS: "status",
  ROLE: "role",
  REPAYMENT_FREQUENCY: "repaymentFrequency",
  VERIFICATION: "verification",
  FROM_DATE: "fromDate",
  TO_DATE: "toDate",
  TIME_FILTER: "timePeriod",
} as const;

// Dashboard time period filter
export const timePeriod: OptionItem[] = [
  { label: "Today", value: "today" },
  { label: "Last Week", value: "last_week" },
  { label: "Last 15 Days", value: "last_15_days" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 3 Months", value: "last_3_months" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "Last Year", value: "last_year" },
];

// User role filter
export const userRole: OptionItem[] = [
  { label: "All Users", value: "all" },
  { label: "Manager", value: "isManager" },
  { label: "Collector", value: "isCollector" },
];

// User status filter
export const userStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// Customer verification status filter
export const customerVerificationStatus: OptionItem[] = [
  { label: "Verification Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Verified", value: "verified" },
  { label: "Rejected", value: "rejected" },
];

// Loan status filter
export const loanStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "Defaulted", value: "defaulted" },
];

// Emi Schedule status filter
export const emiScheduleStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Partial", value: "partial" },
  { label: "Overdue", value: "overdue" },
];

// Follow-up status filter
export const followUpStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];
