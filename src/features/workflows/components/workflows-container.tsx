"use client";

import { EntityContainer } from "@/components/entity/entity-container";
import { WorkflowsHeader } from "../../workflows/components/workflows-header";
import { WorkflowsSearch } from "../../workflows/components/workflows-search";
import { WorkflowsPagination } from "../../workflows/components/workflows-pagination";

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
