"use client";

import { EntityList } from "@/components/entity/entity-list";
import { useSuspenseExecutions } from "../../executions/hooks/use-executions";
import { ExecutionsEmpty } from "./executions-empty";
import { ExecutionsItem } from "./executions-item";

export const ExecutionsList = () => {
  const executions = useSuspenseExecutions();

  if (executions?.data?.items?.length === 0) {
    return <ExecutionsEmpty />;
  }

  return (
    <EntityList
      items={executions.data.items}
      getKey={(execution) => execution.id}
      renderItem={(execution) => <ExecutionsItem data={execution} />}
      emptyView={<ExecutionsEmpty />}
    />
  );
};
