"use client";

import { PROFILE_KEY } from "@/constants";
import { AuthService, ProfileService } from "@/services";
import { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

const profileService = new ProfileService();
const authService = new AuthService();

export const useProfileQuery = () => {
  return useQuery<UserProfile>({
    queryKey: PROFILE_KEY,
    queryFn: async () => {
      const response = await profileService.getProfile();

      return response.data?.data;
    },
    enabled: authService.isAuthenticated(),
  });
};