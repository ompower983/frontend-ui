"use client";
import { Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AppButton } from "@/components/Common";

interface UploadInputProps {
  name: string;
  label: string;
  maxCount?: number;
  listType?: "text" | "picture" | "picture-card" | "picture-circle";
  isEdit?: boolean;
}

export const UploadInput = ({
  name,
  label,
  maxCount = 1,
  listType = "picture",
  isEdit = false,
}: UploadInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="fileList"
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
      }}
    >
      <Upload
        name={name}
        listType={listType}
        maxCount={maxCount}
        beforeUpload={() => false}
        onPreview={isEdit ? undefined : () => false}
        showUploadList={{
          showRemoveIcon: !isEdit,
        }}
      >
        <AppButton icon={<UploadOutlined />} label="Click to Upload" />
      </Upload>
    </Form.Item>
  );
};
