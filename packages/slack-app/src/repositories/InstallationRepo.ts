import { datasource } from "data-source";
import { InstallationEntity } from "../entities";

export const installationRepo = datasource
  .getRepository(InstallationEntity)
  .extend({});
