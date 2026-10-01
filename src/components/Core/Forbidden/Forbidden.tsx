import { AppButton } from "@/components/Common";
import { Result } from "antd";
import Link from "next/link";

export const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link href="/">
          <AppButton type="primary" label="Go to Dashboard" />
        </Link>
      }
    />
  );
};
