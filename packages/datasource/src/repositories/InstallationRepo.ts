import { getDatasource } from "@idealgma/datasource";
import { InstallationEntity } from "../entities";

const datasource = getDatasource();

export const installationRepo = datasource
  .getRepository(InstallationEntity)
  .extend({});
