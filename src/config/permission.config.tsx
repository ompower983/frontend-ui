export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  HR: "HR",
  EMPLOYEE: "Employee",
} as const;

export const ROLE_IDS = {
  ADMIN: 1,
  MANAGER: 2,
  HR: 3,
  EMPLOYEE: 4,
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ALL_ROLES: UserRole[] = [
  ROLES.ADMIN,
  ROLES.MANAGER,
  ROLES.HR,
  ROLES.EMPLOYEE,
];

export const ROLE_ROUTES: Record<string, UserRole[]> = {
  "/": ALL_ROLES,

  // Users
  "/users": [ROLES.ADMIN, ROLES.HR],

  // Outdoor Duty
  "/outdoor-duty": [
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.HR,
    ROLES.EMPLOYEE,
  ],

  // Outdoor Duty approval
  "/outdoor-duty/approvals": [
    ROLES.ADMIN,
    ROLES.MANAGER,
  ],

  // DPR
  "/dpr": [
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.EMPLOYEE,
  ],

  // HR
  "/hr": [
    ROLES.ADMIN,
    ROLES.HR,
  ],

  // Finance
  "/finance": [
    ROLES.ADMIN,
    ROLES.HR,
  ],

  // Settings
  "/settings": [
    ROLES.ADMIN,
  ],
};