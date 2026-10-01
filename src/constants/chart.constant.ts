export const LOAN_STATUS_CHART = {
  domain: ["Pending", "Approved", "Rejected", "Active", "Closed", "Defaulted"],
  range: ["#faad14", "#52c41a", "#ff4d4f", "#1890ff", "#2f54eb", "#000000"],
};

export const EMI_FOLLOW_UP_CHART = {
  domain: ["Pending", "Completed"],
  range: ["#faad14", "#52c41a"],
};

export const EMPTY_CHART = {
  domain: ["No Data"],
  range: ["#d9d9d9"],
  data: [{ type: "No Data", value: 1 }],
};
