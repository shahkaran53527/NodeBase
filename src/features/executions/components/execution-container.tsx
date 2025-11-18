"use client";

import { EntityContainer } from "@/components/entity/entity-container";
import { ExecutionsHeader } from "./executions-header";
import { ExecutionsPagination } from "./executions-pagination";

export const ExecutionsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<ExecutionsHeader />}
      pagination={<ExecutionsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
