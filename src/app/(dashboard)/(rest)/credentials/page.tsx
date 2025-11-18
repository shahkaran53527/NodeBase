import { CredentialsContainer } from "@/features/credentials/components/credentials-container";
import { CredentialsError } from "@/features/credentials/components/credentials-error";
import { CredentialsList } from "@/features/credentials/components/credentials-list";
import { CredentialsLoading } from "@/features/credentials/components/credentials-loading";
import { credentialsLoader } from "@/features/credentials/server/params-loader";
import { prefetchCredentials } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { ErrorBoundary } from "@sentry/nextjs";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { HydrateClient } from "trpc/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await credentialsLoader(searchParams);
  prefetchCredentials(params);

  return (
    <CredentialsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<CredentialsError />}>
          <Suspense fallback={<CredentialsLoading />}>
            <CredentialsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </CredentialsContainer>
  );
};

export default Page;
