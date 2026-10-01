"use client";
import { Form, Input } from "antd";
import { KeyboardEvent } from "react";

interface TextInputProps {
  name: string;
  label: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: "string" | "number" | "boolean" | "url" | "email";
  pattern?: RegExp;
  max?: number;
  requiredMsg?: string;
  typeMsg?: string | undefined;
  patternMsg?: string;
  maxMsg?: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  isPassword?: boolean;
  isTextarea?: boolean;
  rows?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  name,
  label,
  defaultValue,
  required = false,
  type,
  pattern,
  max = 0,
  requiredMsg,
  typeMsg,
  patternMsg,
  maxMsg,
  placeholder,
  className = "",
  disabled = false,
  isPassword = false,
  isTextarea = false,
  rows = 2,
  onKeyDown
}: TextInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={defaultValue}
      rules={[
        required ? { required, message: requiredMsg } : {},
        type ? { type, message: typeMsg } : {},
        pattern ? { pattern, message: patternMsg } : {},
        max ? { max, message: maxMsg }: {}
      ].filter(Boolean)}
    >
      {isPassword ? (
        <Input.Password
          placeholder={placeholder}
          className={className ? className : "w-full! h-10! md:h-8 lg:h-10"}
        />
      ) : isTextarea ? (
        <Input.TextArea
          placeholder={placeholder}
          rows={rows}
          className={className ? className : ""}
        />
      ) : (
        <Input
          placeholder={placeholder}
          disabled={disabled}
          className={className ? className : "w-full! h-10! md:h-8 lg:h-10"}
          onKeyDown={onKeyDown}
        />
      )}
    </Form.Item>
  );
};
