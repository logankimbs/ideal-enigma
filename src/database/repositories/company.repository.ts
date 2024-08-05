import { AppDataSource } from "../data-source";
import { Company } from "../entities";

export const CompanyRepository = AppDataSource.getRepository(Company).extend({
  // add custom methods
});
