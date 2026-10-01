"use client";
import { DatePicker, Select } from "antd";
import { Dayjs } from "dayjs";

interface FilterInputProps {
  placeholder: string;
  filterKey: string;
  value: string | Dayjs | null;
  options?: { label: string | number; value: string | number }[];
  className: string;
  isDatePicker?: boolean;
  format?: string;
  onChange: (name: string, value?: string | undefined) => void;
}

export const FilterInput = ({
  placeholder,
  filterKey,
  value,
  options,
  className = "",
  isDatePicker = false,
  format = "DD/MM/YYYY",
  onChange,
}: FilterInputProps) => {
  return (
    <>
      {isDatePicker ? (
        <DatePicker
          placeholder={placeholder}
          value={value as Dayjs | null}
          format={format}
          className={className ? className : ""}
          onChange={(date) => {
            onChange(filterKey, date ? date.format("YYYY-MM-DD") : undefined);
          }}
        />
      ) : (
        <Select
          placeholder={placeholder}
          value={value as string}
          options={options}
          className={className ? className : ""}
          onChange={(value) => onChange(filterKey, String(value))}
        />
      )}
    </>
  );
};
