"use client";
import { useProfileQuery } from "@/api";
import { AuthService } from "@/services";
import { UserProfile } from "@/types";
import { useEffect, useState } from "react";

const authService = new AuthService();

export const useProfile = () => {
  const { data: profileData, isPending } = useProfileQuery();
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const profile = authService.getUserProfile();
    setLocalProfile(profile || null);
  }, []);

  return { data: profileData ?? localProfile, isPending };
};
