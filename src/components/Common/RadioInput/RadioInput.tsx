"use client";
import { Form, Radio } from "antd";

interface RadioInputProps {
  name: string;
  label: string;
  required?: boolean;
  requiredMsg?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

export const RadioInput = ({
  name,
  label,
  required = false,
  requiredMsg,
  options,
  disabled = false,
}: RadioInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required, message: requiredMsg }] : undefined}
    >
      <Radio.Group options={options} disabled={disabled} />
    </Form.Item>
  );
};
