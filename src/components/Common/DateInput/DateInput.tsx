"use client";
import { DatePicker, Form } from "antd";

interface DateInputProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  requiredMsg?: string;
  disabled?: boolean;
  format?: string;
  className?: string;
}

export const DateInput = ({
  name,
  label,
  placeholder,
  required = false,
  requiredMsg,
  disabled = false,
  format = "DD/MM/YYYY",
  className = "",
}: DateInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required, message: requiredMsg }] : []}
    >
      <DatePicker
        placeholder={placeholder}
        format={format}
        disabled={disabled}
        className={className ? className : "w-full! h-10! md:h-8 lg:h-10"}
      />
    </Form.Item>
  );
};
