import { ForbiddenContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Forbidden",
  description: "You do not have permission to access this page.",
  robots: {
    index: false,
    follow: false
  }
};

export default function ForbiddenPage() {
  return <ForbiddenContainer />;
};