"use client";

import { EntityList } from "@/components/entity/entity-list";
import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { WorkflowsEmpty } from "./workflows-empty";
import { WorkflowsItem } from "./workflows-item";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  if (workflows?.data?.items?.length === 0) {
    return <WorkflowsEmpty />;
  }

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowsItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
};
