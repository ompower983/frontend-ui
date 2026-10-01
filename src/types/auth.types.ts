export interface LoginFormValue {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  role: {
    id: number;
    name: string;
  } | null;
}

export interface LoginResponse {
  token: string;
  user: LoginUser;
}