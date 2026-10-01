import { formatDate, formatDateTime } from "./helper";

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "--";
  return String(value);
};

const formatDateTimeValue = (value?: string): string => {
  return value ? formatDateTime(value) : "--";
};

const formatDateValue = (value?: string): string => {
  return value ? formatDate(value) : "--";
};

const formatCurrency = (value: string | number) =>
  value
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(Number(value))
    : "--";

const formatInstallmentNo = (value?: number) => (value ? `EMI ${value}` : "--");

const formatReceiptNo = (value?: number) =>
  value ? `RCPT-${String(value).padStart(3, "0")}` : "--";

export const formatters = {
  value: formatValue,
  dateTime: formatDateTimeValue,
  date: formatDateValue,
  currency: formatCurrency,
  installmentNo: formatInstallmentNo,
  receiptNo: formatReceiptNo,
};
