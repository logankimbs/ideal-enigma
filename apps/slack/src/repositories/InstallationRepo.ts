import datasource from "@idealgma/datasource";
import { InstallationEntity } from "../entities";

export const installationRepo = datasource
  .getRepository(InstallationEntity)
  .extend({});
