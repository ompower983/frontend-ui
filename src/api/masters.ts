"use client";

import { MASTER_KEYS } from "@/constants";
import { MasterService } from "@/services";
import { MasterItem } from "@/types";
import { useQuery } from "@tanstack/react-query";

const masterService = new MasterService();

export const useDepartmentsQuery = () => {
    return useQuery<MasterItem[]>({
        queryKey: MASTER_KEYS.departments,
        queryFn: async () => {
            const response = await masterService.getDepartments();
            return response.data?.data ?? [];
        },
    });
};

export const useDesignationsQuery = () => {
    return useQuery<MasterItem[]>({
        queryKey: MASTER_KEYS.designations,
        queryFn: async () => {
            const response = await masterService.getDesignations();
            return response.data?.data ?? [];
        },
    });
};