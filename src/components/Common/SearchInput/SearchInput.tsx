"use client";
import { Input } from "antd";
import { ReactNode } from "react";

interface SearchInputProps {
  prefixIcon: ReactNode;
  value: string;
  className: string;
  onSearch: (value: string) => void;
}

export const SearchInput = ({ prefixIcon, value, className = "", onSearch }: SearchInputProps) => {
  return (
    <Input
      placeholder="Search here..."
      prefix={prefixIcon}
      value={value}
      className={className ? className : ""}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};
