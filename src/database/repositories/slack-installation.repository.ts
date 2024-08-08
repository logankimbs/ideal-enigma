import { AppDataSource } from "../data-source";
import { SlackInstallation } from "../entities";

export const SlackInstallationRepository = AppDataSource.getRepository(
  SlackInstallation,
).extend({
  // add custom methods
});
