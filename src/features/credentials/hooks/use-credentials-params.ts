import { credentialsParams } from "@/features/credentials/params";
import { useQueryStates } from "nuqs";

export const useCredentialsParams = () => {
  return useQueryStates(credentialsParams);
};
