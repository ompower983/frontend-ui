export interface UserRole {
  id: number;
  name: string;
}

export interface UserProfile {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  departmentId: number;
  designationId: number;
  roleId: number;
  reportsToUserId: number | null;
  grade: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: UserRole | null;
  department: {
    id: number;
    name: string;
  } | null;

  designation: {
    id: number;
    name: string;
  } | null;

  manager: {
    id: number;
    employeeCode: string;
    fullName: string;
  } | null;
}