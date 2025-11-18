import { EmptyView } from "@/components/entity/entity-state-view";
import { useRouter } from "next/navigation";

export const CredentialsEmpty = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/credentials/new`);
  };

  return (
    <EmptyView
      onNew={handleCreate}
      message="You haven't created any credentials yet. Get started by creating your first credential."
    />
  );
};
