import { Company } from "../entities/Company";
import { companyRepository } from "../repositiories";

export class CompanyService {
  private repo = companyRepository();

  async createCompany(name: string, domain: string): Promise<Company> {
    const newCompany = new Company();
    newCompany.name = name;
    newCompany.domain = domain;
    newCompany.created_at = new Date();
    newCompany.updated_at = new Date();

    return await this.repo.save(newCompany);
  }

  async findAllCompanies(): Promise<Company[]> {
    return await this.repo.find();
  }

  async updateCompany(
    companyId: string,
    name: string,
  ): Promise<Company | null> {
    const company = await this.repo.findOneBy({ id: companyId });
    if (company) {
      company.name = name;
      return await this.repo.save(company);
    }
    return null;
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.repo.delete(companyId);
  }
}
