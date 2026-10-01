"use client";

import { useUpdateUserMutation } from "@/api";
import {
  AppButton,
  AppToast,
  FormSkeleton,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { allRoleList } from "@/constants";
import { useProfile } from "@/hooks";
import { UserFormValues, UserProfile } from "@/types";
import { handleNumericKeyDown } from "@/utils";
import { Col, Form, Row } from "antd";
import { useEffect } from "react";

const toFormValues = (
  user?: UserProfile | null,
): UserFormValues => ({
  employeeCode: user?.employeeCode ?? "",
  fullName: user?.fullName ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  roleId: user?.roleId,
});

const toApiPayload = (values: UserFormValues) => ({
  employeeCode: values.employeeCode.trim(),
  fullName: values.fullName.trim(),
  phone: values.phone.trim(),
});

export const Profile = () => {
  const [form] = Form.useForm();

  const { data, isPending } = useProfile();

  const {
    mutateAsync: updateUser,
    isPending: isUpdating,
  } = useUpdateUserMutation();

  useEffect(() => {
    if (!isPending && data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, isPending, form]);

  const handleSubmit = async (values: UserFormValues) => {
    if (!data?.id) return;

    const payload = toApiPayload(values);

    try {
      const response = await updateUser({
        id: data.id,
        payload,
      });

      if (response?.status === 200) {
        AppToast.success("Profile updated successfully");
      }
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ??
        "Failed to save profile",
      );
    }
  };

  if (isPending) {
    return <FormSkeleton fields={5} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        My Account
      </h2>

      <Form
        form={form}
        layout="vertical"
        initialValues={toFormValues(data)}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          {/* Employee Code */}
          <Col xs={24} sm={12}>
            <TextInput
              name="employeeCode"
              label="Employee Code"
              required
              requiredMsg="Employee Code is required"
              placeholder="Enter employee code"
              disabled
            />
          </Col>

          {/* Full Name */}
          <Col xs={24} sm={12}>
            <TextInput
              name="fullName"
              label="Full Name"
              required
              requiredMsg="Full Name is required"
              placeholder="Enter full name"
            />
          </Col>

          {/* Email */}
          <Col xs={24} sm={12}>
            <TextInput
              name="email"
              label="Email"
              required
              type="email"
              requiredMsg="Email is required"
              typeMsg="Invalid email"
              placeholder="Enter email"
              disabled
            />
          </Col>

          {/* Mobile Number */}
          <Col xs={24} sm={12}>
            <TextInput
              name="phone"
              label="Mobile Number"
              required
              pattern={/^[0-9]{10,15}$/}
              requiredMsg="Mobile Number is required"
              patternMsg="Phone number must be between 10 and 15 digits."
              placeholder="Enter mobile number"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>

          {/* Role */}
          <Col xs={24} sm={12}>
            <SelectInput
              name="roleId"
              label="Role"
              required
              requiredMsg="Role is required"
              placeholder="Select role"
              options={allRoleList}
              disabled
            />
          </Col>
        </Row>

        <Row
          gutter={[12, 12]}
          justify="end"
          className="mt-6"
        >
          <Col xs={24} sm={8} md={6} lg={4}>
            <AppButton
              block
              label="Reset"
              onClick={() => form.resetFields()}
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>

          <Col xs={24} sm={8} md={6} lg={4}>
            <AppButton
              block
              type="primary"
              htmlType="submit"
              label="Save"
              disabled={isUpdating}
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};