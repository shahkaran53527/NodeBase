import { credentialsParams } from "@/features/credentials/params";
import { createLoader } from "nuqs/server";

export const credentialsLoader = createLoader(credentialsParams);
