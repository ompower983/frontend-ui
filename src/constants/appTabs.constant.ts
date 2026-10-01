import { ROLES } from "@/config";
import { TabsProps } from "antd";

export const userRoleTabs: TabsProps["items"] = [
  {
    key: ROLES.MANAGER,
    label: "Managers",
  },
  {
    key: ROLES.EMPLOYEE,
    label: "Employees",
  },
];
export const repaymentFrequencyTabs: TabsProps["items"] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export const loanEmiTabs: TabsProps["items"] = [
  { key: "schedule", label: "EMI Schedule" },
  { key: "collection", label: "EMI Collection" },
  { key: "followUp", label: "EMI Follow-up" },
];

// export const loanEmiTabs: TabsProps["items"] = [
//   { key: "schedule", label: "Tab 1" },
//   { key: "collection", label: "Tab 2" },
//   { key: "followUp", label: "Tab 3" },
// ];