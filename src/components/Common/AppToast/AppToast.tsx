import { message } from "antd";

type ToastFn = (content: string) => void;

type AppToastType = {
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
  info: ToastFn;
};

export const AppToast: AppToastType = {
  success: message.success,
  error: message.error,
  warning: message.warning,
  info: message.info,
};
