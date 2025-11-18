"use client";

import { useCredentialsParams } from "../../credentials/hooks/use-credentials-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { EntitySearch } from "@/components/entity/entity-search";

export const CredentialsSearch = () => {
  const [params, setParams] = useCredentialsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search credentials"
    />
  );
};
