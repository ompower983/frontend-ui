import CookiePersistence from "../../utils/cookiePersistence";
import { Client } from "../apiClient";

const client = new Client();
const localCookie = new CookiePersistence();

export default class ProfileService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getProfile() {
    return client.api({
      method: "GET",
      url: "/auth/profile",
      headers: this.getAuthHeaders(),
    });
  }
}
