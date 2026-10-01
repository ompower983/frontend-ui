"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { getQueryClient } from "./getQueryClient";

interface Props {
  children: React.ReactNode;
}

const queryClient = getQueryClient();

export default function QueryWrapper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}