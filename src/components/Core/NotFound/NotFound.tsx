import { AppButton } from "@/components/Common";
import { Result } from "antd";
import Link from "next/link";

export const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href="/">
          <AppButton type="primary" label="Go to Dashboard" />
        </Link>
      }
    />
  );
};
