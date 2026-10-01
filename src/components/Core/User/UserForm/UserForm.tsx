"use client";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserQuery,
  useDepartmentsQuery,
  useDesignationsQuery,
} from "@/api";
import {
  AppButton,
  AppSwitch,
  AppToast,
  FormSkeleton,
  InputSkeleton,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { ROLES } from "@/config";
import { roleList } from "@/constants";
import { useAuthorization, usePageBreadcrumbs } from "@/hooks";
import { UserFormValues, UserRow } from "@/types";
import { handleNumericKeyDown, resolveNumericId } from "@/utils";
import { Col, Form, Row } from "antd";
import { useParams, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useMemo } from "react";

const toFormValues = (
  user?: UserRow | null,
): UserFormValues => ({
  employeeCode: user?.employeeCode ?? "",
  fullName: user?.fullName ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  departmentId: user?.departmentId ?? undefined,
  designationId: user?.designationId ?? undefined,
  roleId: user?.roleId ?? undefined,
  reportsToUserId: user?.reportsToUserId ?? null,
  grade: user?.grade ?? null,
  isActive: user?.isActive ?? false,
});

const toApiPayload = (values: UserFormValues) => ({
  employeeCode: values.employeeCode.trim(),
  fullName: values.fullName.trim(),
  email: values.email.trim(),
  phone: values.phone.trim(),
  password: values.password,
  departmentId: values.departmentId,
  designationId: values.designationId,
  roleId: values.roleId,
  reportsToUserId: values.reportsToUserId ?? null,
  grade: values.grade?.trim() || null,
  isActive: values.isActive,
});

interface UserFormProps {
  breadcrumbs?: string[];
}

export const UserForm: FC<UserFormProps> = ({ breadcrumbs }) => {
  const EMPTY_MASTER_ITEMS: { id: number; name: string }[] = [];
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [form] = Form.useForm();
  const { isAdmin, isManager } = useAuthorization();

  const id: string = params?.id;
  const numericId = useMemo(() => resolveNumericId(id), [id]);

  const isEdit: boolean = !!numericId;

  const { data, isLoading } = useUserQuery(numericId!);

  const { data: departments } = useDepartmentsQuery();

  const { data: designations } = useDesignationsQuery();

  const departmentList =
    departments ?? EMPTY_MASTER_ITEMS;

  const designationList =
    designations ?? EMPTY_MASTER_ITEMS;

  const departmentOptions = useMemo(
    () =>
      departmentList.map((department) => ({
        label: department.name,
        value: department.id,
      })),
    [departmentList],
  );

  const designationOptions = useMemo(
    () =>
      designationList.map((designation) => ({
        label: designation.name,
        value: designation.id,
      })),
    [designationList],
  );
  const canEditUser: boolean =
    isAdmin ||
    (isManager && data?.role?.name === "Manager");

  const { mutateAsync: createUser, isPending: isCreating } =
    useCreateUserMutation();
  const { mutateAsync: updateUser, isPending: isUpdating } =
    useUpdateUserMutation();

  const isSubmitting: boolean = isCreating || isUpdating;

  const userId = isLoading ? <InputSkeleton /> : `User-${id}` || "";
  const title: any = isEdit ? data?.fullName || userId : "Add User";
  usePageBreadcrumbs(title, breadcrumbs, "Users");

  useEffect(() => {
    if (data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, form]);

  const handleSubmit = async (values: UserFormValues) => {
    const payload = toApiPayload(values);

    try {
      if (isEdit && data?.id) {
        const { password, roleId, ...updatePayload } = payload;
        const response = await updateUser({
          id: data.id,
          payload: updatePayload,
        });

        if (response && response.status === 200) {
          AppToast.success(response.data?.message ?? "User updated");
        }
      } else {
        const response = await createUser(payload);
        if (response && response.status === 201) {
          AppToast.success(response.data?.message ?? "User created");
        }
      }

      router.replace("/users");
    } catch (error: any) {
      AppToast.error(error?.response?.data?.message ?? "Failed to save user");
    }
  };

  if (isEdit && isLoading) {
    return <FormSkeleton fields={6} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        {isEdit
          ? canEditUser
            ? "Update User"
            : "User Details"
          : "Create User"}
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
              required={true}
              requiredMsg="Employee Code is required"
              placeholder="Enter employee code"
              disabled={isEdit}
            />
          </Col>

          {/* Password */}
          {!isEdit && (
            <Col xs={24} sm={12}>
              <TextInput
                name="password"
                label="Password"
                isPassword={true}
                required={true}
                pattern={
                  /^(?=^[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).{6,12}$/
                }
                requiredMsg="Password is required"
                patternMsg="Password must be 6–12 chars, start uppercase, include special character and number."
                placeholder="Enter password"
              />
            </Col>
          )}

          {/* Full Name */}
          <Col xs={24} sm={12}>
            <TextInput
              name="fullName"
              label="Full Name"
              required={true}
              requiredMsg="Full Name is required"
              placeholder="Enter full name"
            />
          </Col>

          {/* Email */}
          <Col xs={24} sm={12}>
            <TextInput
              name="email"
              label="Email"
              required={true}
              type="email"
              requiredMsg="Email is required"
              typeMsg="Invalid email"
              placeholder="Enter email"
            />
          </Col>

          {/* Phone */}
          <Col xs={24} sm={12}>
            <TextInput
              name="phone"
              label="Mobile Number"
              required={true}
              pattern={/^[0-9]{10,15}$/}
              requiredMsg="Mobile Number is required"
              patternMsg="Phone number must be between 10 and 15 digits."
              placeholder="Enter mobile number"
              onKeyDown={(e) =>
                handleNumericKeyDown(e)
              }
            />
          </Col>

          {/* Role */}
          <Col xs={24} sm={12}>
            <SelectInput
              name="roleId"
              label="Role"
              required={true}
              requiredMsg="Role is required"
              placeholder="Select role"
              options={roleList || []}
              disabled={isEdit}
            />
          </Col>

          {/* Department */}
          <Col xs={24} sm={12}>
            <SelectInput
              name="departmentId"
              label="Department"
              required={true}
              requiredMsg="Department is required"
              placeholder="Select department"
              options={departmentOptions} />
          </Col>

          {/* Designation */}
          <Col xs={24} sm={12}>
            <SelectInput
              name="designationId"
              label="Designation"
              required={true}
              requiredMsg="Designation is required"
              placeholder="Select designation"
              options={designationOptions}
            />
          </Col>

          {/* Grade */}
          <Col xs={24} sm={12}>
            <TextInput
              name="grade"
              label="Grade"
              placeholder="Enter grade"
            />
          </Col>

          {/* Status */}
          {/* {isEdit && (
            <Col xs={24} sm={12}>
              <AppSwitch
                name="isActive"
                label="Status"
              />
            </Col>
          )} */}
        </Row>

        {(!isEdit || canEditUser) && (
          <Row
            gutter={[12, 12]}
            justify="end"
            className="mt-6"
          >
            <Col
              xs={24}
              sm={8}
              md={6}
              lg={4}
            >
              <AppButton
                block
                label="Reset"
                onClick={() =>
                  form.resetFields()
                }
                className="w-full! h-10! md:h-8 lg:h-10"
              />
            </Col>

            <Col
              xs={24}
              sm={8}
              md={6}
              lg={4}
            >
              <AppButton
                block
                type="primary"
                htmlType="submit"
                label="Save"
                disabled={isSubmitting}
                className="w-full! h-10! md:h-8 lg:h-10"
              />
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};
