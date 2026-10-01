"use client";
import { useLoginMutation } from "@/api";
import { AppToast } from "@/components";
import { AuthService } from "@/services";
import { LoginFormValue, LoginResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const authService = new AuthService();

export const useAuthentication = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation();

  const handleLogin = async (value: LoginFormValue) => {
    try {
      const payload = {
        email: value.email,
        password: value.password
      };
      const response = await login(payload);
      if (response && response.status === 200) {
        AppToast.success(response.data?.message ?? "Login successful");
        const { token, user } = response.data?.data as LoginResponse;
        authService.setTokens(token);
        if (user) {
          authService.setUserProfile(user);
        }
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error: any) {
      setIsRedirecting(false);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || "Invalid credentials";
      AppToast.error(errorMsg);
    }
  };

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUserProfile();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return {
    handleLogin,
    handleLogout,
    isLoginPending,
    isRedirecting
  };
};