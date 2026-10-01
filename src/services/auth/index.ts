import { BrowserPersistence } from "@/utils";
import { Client } from "../apiClient";
import CookiePersistence from "@/utils/cookiePersistence";
import { LoginPayload, UserProfile } from "@/types";
import { storageKeys } from "@/constants";

const PROFILE_TTL = 8 * 60 * 60;

const client = new Client();
const storage = new BrowserPersistence();
const localCookie = new CookiePersistence();

export default class AuthService {
  setTokens(token: string) {
    if (token) {
      const ttl = 8 * 60 * 60;
      storage.setItem("token", token, ttl);
      localCookie.setItem("access_token", token, ttl);
    }
  }

  isAuthenticated() {
    const token = storage.getItem("token") || localCookie.getItem("access_token");
    return !!token;
  }

  removeToken() {
    storage.removeItem("token");
    localCookie.removeItem("access_token");
  }

  setUserProfile(user: UserProfile) {
    storage.setItem(
      storageKeys.USER_PROFILE,
      user as unknown as string,
      PROFILE_TTL,
    );
    localCookie.setItem(storageKeys.USER_PROFILE, user, PROFILE_TTL);
  }

  getUserProfile() {
    return (
      (localCookie.getItem(storageKeys.USER_PROFILE) as UserProfile | undefined) ||
      (storage.getItem(storageKeys.USER_PROFILE) as UserProfile | undefined)
    );
  }

  removeUserProfile() {
    storage.removeItem(storageKeys.USER_PROFILE);
    localCookie.removeItem(storageKeys.USER_PROFILE);
  }

  getToken() {
    const token = storage.getItem("token");
    return token;
  }

  getAccessToken() {
    const token = localCookie.getItem("access_token");
    return token;
  }

  login(data: LoginPayload) {
    return client.api({
      method: "POST",
      url: "/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
  }
};