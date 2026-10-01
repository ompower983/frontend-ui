import { NotFoundContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFoundPage() {
  return <NotFoundContainer />;
};