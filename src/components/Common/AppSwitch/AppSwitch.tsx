"use client";
import { Form, Switch } from "antd";

interface AppSwitchProps {
  name?: string;
  label?: string;
  defaultValue?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const AppSwitch = ({ name, label, defaultValue = false, checked, onChange }: AppSwitchProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      // initialValue={defaultValue}
    >
      <Switch checked={checked} onChange={onChange} />
    </Form.Item>
  );
};
