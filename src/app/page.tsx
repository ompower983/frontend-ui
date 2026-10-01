import { DashboardContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Om Power Transmission Limited",
  description:
    "Centralized dashboard for monitoring users and business operations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return <DashboardContainer />;
}