type Role = {
  id: number;
  label: string;
  value: number;
};

// All User role list
export const allRoleList: Role[] = [
  { id: 1, label: "Admin", value: 1 },
  { id: 2, label: "Manager", value: 2 },
  { id: 3, label: "HR", value: 3 },
  { id: 4, label: "Employee", value: 4 },
];

// User role list
export const roleList: Role[] = [
  { id: 1, label: "Manager", value: 2 },
  { id: 2, label: "Employee", value: 4 },
];