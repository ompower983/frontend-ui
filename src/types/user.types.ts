import { ListParams, PaginationInfo } from "./common.types";
import { UserRole } from "./profile.types";

export type RoleFilter = "all" | UserRole["name"];
export interface UserDepartment {
  id: number;
  name: string;
}

export interface UserDesignation {
  id: number;
  name: string;
}

export interface UserManager {
  id: number;
  employeeCode: string;
  fullName: string;
  designationId?: number;
  departmentId?: number;
}

export interface UserApiRecord {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  departmentId: number | null;
  designationId: number | null;
  roleId: number | null;
  reportsToUserId: number | null;
  grade: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: UserRole | null;
  department: UserDepartment | null;
  designation: UserDesignation | null;
  manager: UserManager | null;
}

export interface UserPaginatedResponse {
  page_info: PaginationInfo;
  items: UserApiRecord[];
}

export interface UserListParams extends ListParams {
  roleId?: number;
  departmentId?: number;
  designationId?: number;
  status?: boolean;

}

export type UserRow = {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;

  departmentId: number | null;
  designationId: number | null;
  roleId: number | null;
  reportsToUserId: number | null;
  grade: string | null;

  isActive: boolean;

  createdAt: string;

  role: UserRole | null;
  department: UserDepartment | null;
  designation: UserDesignation | null;
  manager: UserManager | null;
};

export interface UserFormValues {
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  designationId?: number;
  departmentId?: number;
  roleId?: number;
  reportsToUserId?: number | null;
  grade?: string | null;

  isActive?: boolean;
}