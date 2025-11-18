"use client";

import { useSuspenseExecutions } from "../../executions/hooks/use-executions";
import { useExecutionsParams } from "../../executions/hooks/use-executions-params";
import { EntityPagination } from "@/components/entity/entity-pagination";

export const ExecutionsPagination = () => {
  const executions = useSuspenseExecutions();
  const [params, setParams] = useExecutionsParams();

  return (
    <EntityPagination
      page={executions.data.page}
      totalPages={executions.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={executions.isFetching}
    />
  );
};
