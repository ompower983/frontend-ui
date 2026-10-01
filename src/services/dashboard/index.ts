import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";

const client = new Client();
const localCookie = new CookiePersistence();

export default class DashboardService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getDashboard() {
    return client.api({
      method: "GET",
      url: "/dashboard",
      headers: this.getAuthHeaders(),
    });
  }
}