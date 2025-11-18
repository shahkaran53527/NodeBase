"use client";

import { useSuspenseCredential } from "../hooks/use-credentials";
import { CredentialForm } from "./credential-form";

export const CredentialView = ({ credentialId }: { credentialId: string }) => {
  const { data: credential } = useSuspenseCredential(credentialId);

  return <CredentialForm initialData={credential} />;
};
