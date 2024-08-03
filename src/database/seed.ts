import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Company, User } from "./entities";

async function seed() {
  await AppDataSource.initialize();

  const companyRepository = AppDataSource.getRepository(Company);
  const userRepository = AppDataSource.getRepository(User);

  // create companies
  const company1 = new Company();
  company1.name = "Company One";
  company1.domain = "companyone.com";
  await companyRepository.save(company1);

  const company2 = new Company();
  company2.name = "Company Two";
  company2.domain = "companytwo.com";
  await companyRepository.save(company2);

  // create users
  const user1 = new User();
  user1.name = "John Doe";
  user1.email = "john.doe@companyone.com";
  user1.company = company1;
  user1.is_active = true;
  await userRepository.save(user1);

  // create sources
  // create insights
  // create tags
  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
