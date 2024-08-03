import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Company } from "../entities";

const companyRepository = (): Repository<Company> => {
  return AppDataSource.getRepository(Company);
};

export default companyRepository;
