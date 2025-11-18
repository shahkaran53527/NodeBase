"use client";

import { EntityContainer } from "@/components/entity/entity-container";
import { CredentialsHeader } from "./credentials-header";
import { CredentialsSearch } from "./credentials-search";
import { CredentialsPagination } from "./credentials-pagination";

export const CredentialsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch />}
      pagination={<CredentialsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
