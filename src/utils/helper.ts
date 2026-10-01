import { KeyboardEvent } from "react";

// format date time
export const formatDateTime = (value: string | number | Date): string => {
  return new Date(value)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
};

// format date
export const formatDate = (value: string | number | Date): string => {
  return new Date(value)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(",", "");
};

export const handleNumericKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.ctrlKey || e.metaKey) return;

  if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key))
    return;

  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};

export const resolveNumericId = (param?: string): number | null => {
  if (!param) return null;
  const parsed = Number(param);
  if (!Number.isNaN(parsed) && Number.isFinite(parsed)) return parsed;
  return null;
};

type OptionItem<T = string | number> = {
  value: T;
  label: string;
};

export const createOptionMap = <T extends OptionItem>(
  list: T[],
): Record<T["value"], T["label"]> => {
  return Object.fromEntries(
    list.map((item) => [item.value, item.label]),
  ) as any;
};

export const getInstallmentDisplay = (installmentNos: number[]) => {
  if (!installmentNos?.length) return "-";

  const sorted = [...installmentNos].sort((a, b) => a - b);

  if (sorted.length === 1) {
    return `EMI ${sorted[0]}`;
  }

  const isContinuous = sorted.every(
    (num, index) => index === 0 || num === sorted[index - 1] + 1,
  );

  return isContinuous
    ? `EMI ${sorted[0]}-${sorted[sorted.length - 1]}`
    : `EMI ${sorted.join(", ")}`;
};
