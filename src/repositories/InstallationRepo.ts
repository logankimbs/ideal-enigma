import { datasource } from "../config/datasource";
import { InstallationEntity } from "../entities";

export const installationRepo = datasource
  .getRepository(InstallationEntity)
  .extend({});
