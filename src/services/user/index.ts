import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { UserFormValues, UserListParams } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class UserService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // ----------------------------------------------------
  // GET ALL USERS
  // GET /api/users/all
  // ----------------------------------------------------

  getUsers(params?: UserListParams) {
    return client.api({
      method: "GET",
      url: "/users/all",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  // ----------------------------------------------------
  // GET USER BY ID
  // GET /api/users/:id
  // ----------------------------------------------------

  getUser(id: number) {
    return client.api({
      method: "GET",
      url: `/users/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  // ----------------------------------------------------
  // CREATE USER
  // POST /api/users/create
  // ----------------------------------------------------

  createUser(payload: UserFormValues) {
    return client.api({
      method: "POST",
      url: "/users/create",
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }

  // ----------------------------------------------------
  // UPDATE USER
  // PATCH /api/users/:id
  // ----------------------------------------------------

  updateUser(id: number, payload: Partial<UserFormValues>) {
    return client.api({
      method: "PATCH",
      url: `/users/${id}`,
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }

  // ----------------------------------------------------
  // DELETE USER
  // DELETE /api/users/:id
  // ----------------------------------------------------

  deleteUser(id: number) {
    return client.api({
      method: "DELETE",
      url: `/users/${id}`,
      headers: this.getAuthHeaders(),
    });
  }
}