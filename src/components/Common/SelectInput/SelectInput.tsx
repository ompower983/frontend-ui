"use client";
import { Form, Select } from "antd";

interface SelectInputProps {
  name: string;
  label: string;
  defaultValue?: string | number;
  required?: boolean;
  requiredMsg?: string;
  placeholder: string;
  options: { label: string | number; value: string | number }[];
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  loading?: boolean;
  onSearch?: (value: string) => void;
  onLoadMore?: () => void;
}

export const SelectInput = ({
  name,
  label,
  defaultValue,
  required = false,
  requiredMsg,
  placeholder,
  options,
  disabled = false,
  searchable = false,
  loading = false,
  className = "",
  onSearch,
  onLoadMore,
}: SelectInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required, message: requiredMsg }] : []}
      initialValue={defaultValue}
    >
      <Select
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        loading={loading}
        showSearch={searchable ? { onSearch, filterOption: false } : false}
        onPopupScroll={(e) => {
          const target = e.target as HTMLElement;
          if (
            !loading &&
            target.scrollTop + target.clientHeight >= target.scrollHeight - 20
          ) {
            onLoadMore?.();
          }
        }}
        className={className || "w-full! h-10! md:h-8 lg:h-10"}
      />
    </Form.Item>
  );
};
