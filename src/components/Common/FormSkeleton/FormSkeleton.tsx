import { Col, Row, Skeleton } from "antd";

interface FormSkeletonProps {
  fields?: number;
  showActions?: boolean;
}

export const FormSkeleton = ({
  fields = 10,
  showActions = true,
}: FormSkeletonProps) => {
  return (
    <div className="w-full">
      <Skeleton.Input active block style={{ width: 220, height: 28 }} />

      <Row gutter={[16, 16]} className="mt-6">
        {Array.from({ length: fields }).map((_, index) => (
          <Col xs={24} sm={12} key={index}>
            <div className="mb-2">
              <Skeleton.Input active style={{ width: 100, height: 16 }} />
            </div>
            <Skeleton.Input active block style={{ height: 40 }} />
          </Col>
        ))}
      </Row>

      {showActions && (
        <Row gutter={[12, 12]} justify="end" className="mt-6">
          <Col xs={24} sm={8} md={6} lg={4}>
            <Skeleton.Button active block />
          </Col>
          <Col xs={24} sm={8} md={6} lg={4}>
            <Skeleton.Button active block />
          </Col>
        </Row>
      )}
    </div>
  );
};
