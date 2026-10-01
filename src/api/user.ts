"use client";

import { USER_KEYS } from "@/constants";
import { UserService } from "@/services";
import {
  UserApiRecord,
  UserFormValues,
  UserListParams,
  UserPaginatedResponse,
} from "@/types";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const userService = new UserService();

// ----------------------------------------------------
// GET ALL USERS
// ----------------------------------------------------

export const useUsersQuery = (params?: UserListParams) => {
  return useQuery<UserPaginatedResponse>({
    queryKey: [...USER_KEYS.all, params],

    placeholderData: (previousData) => previousData,

    queryFn: async () => {
      const response = await userService.getUsers(params);

      return response.data?.data;
    },
  });
};

// ---------------------------------------------------- 
// GET USER BY ID
// ----------------------------------------------------

export const useUserQuery = (id: number) => {
  return useQuery<UserApiRecord>({
    queryKey: USER_KEYS.detail(id),

    enabled: !!id,

    queryFn: async () => {
      const response = await userService.getUser(id);

      return response.data?.data;
    },
  });
};

// ----------------------------------------------------
// CREATE USER
// ----------------------------------------------------

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserFormValues) =>
      userService.createUser(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.all,
      });
    },
  });
};

// ----------------------------------------------------
// UPDATE USER
// ----------------------------------------------------

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<UserFormValues>;
    }) => userService.updateUser(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.all,
      });

      queryClient.invalidateQueries({
        queryKey: USER_KEYS.detail(variables.id),
      });
    },
  });
};

// ----------------------------------------------------
// DELETE USER
// ----------------------------------------------------

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      userService.deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.all,
      });
    },
  });
};