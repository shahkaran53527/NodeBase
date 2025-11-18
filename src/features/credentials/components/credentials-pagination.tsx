"use client";

import { useSuspenseCredentials } from "../../credentials/hooks/use-credentials";
import { useCredentialsParams } from "../../credentials/hooks/use-credentials-params";
import { EntityPagination } from "@/components/entity/entity-pagination";

export const CredentialsPagination = () => {
  const credentials = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  return (
    <EntityPagination
      page={credentials.data.page}
      totalPages={credentials.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={credentials.isFetching}
    />
  );
};
