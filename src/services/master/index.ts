"use client";

import CookiePersistence from "../../utils/cookiePersistence";
import { Client } from "../apiClient";

const client = new Client();
const localCookie = new CookiePersistence();

export default class MasterService {
    private getAuthHeaders() {
        const token = localCookie.getItem("access_token");

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }

    getDepartments() {
        return client.api({
            method: "GET",
            url: "/masters/departments",
            headers: this.getAuthHeaders(),
        });
    }

    getDesignations() {
        return client.api({
            method: "GET",
            url: "/masters/designations",
            headers: this.getAuthHeaders(),
        });
    }
}