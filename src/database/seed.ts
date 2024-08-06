import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Company, User } from "./entities";
import { CompanyRepository, UserRepository } from "./repositories";

async function seed() {
  await AppDataSource.initialize();

  const company1 = new Company();
  company1.name = "Apple";
  company1.domain = "https://www.apple.com/";
  await CompanyRepository.save(company1);

  const company2 = new Company();
  company2.name = "Amazon";
  company2.domain = "https://www.amazon.com/";
  await CompanyRepository.save(company2);

  const user1 = new User();
  user1.name = "John Doe";
  user1.email = "john@apple.com";
  user1.company = company1;
  user1.is_active = true;
  await UserRepository.save(user1);

  const user2 = new User();
  user1.name = "Jane Dong";
  user1.email = "jane@amazon.com";
  user1.company = company2;
  user1.is_active = true;
  await UserRepository.save(user2);

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
