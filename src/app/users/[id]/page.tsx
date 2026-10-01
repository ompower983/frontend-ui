import { UserFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update User",
  description: "User module for view, manage and update user details.",
  robots: {
    index: false,
    follow: false
  }
};

export default function UserEditPage() {
  return <UserFormContainer />;
};