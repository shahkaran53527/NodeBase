"use client";

import { EntityList } from "@/components/entity/entity-list";
import { useSuspenseCredentials } from "../../credentials/hooks/use-credentials";
import { CredentialsEmpty } from "./credentials-empty";
import { CredentialsItem } from "./credentials-item";

export const CredentialsList = () => {
  const credentials = useSuspenseCredentials();

  if (credentials?.data?.items?.length === 0) {
    return <CredentialsEmpty />;
  }

  return (
    <EntityList
      items={credentials.data.items}
      getKey={(credential) => credential.id}
      renderItem={(credential) => <CredentialsItem data={credential} />}
      emptyView={<CredentialsEmpty />}
    />
  );
};
