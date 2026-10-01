import { UserFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add User",
  description: "User module for Create a new user.",
  robots: {
    index: false,
    follow: false
  }
};

export default function UserCreatePage() {
  return <UserFormContainer />;
};