import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Company, Insight, Source, Tag, User } from "./entities";
import { getRepository } from "typeorm";

async function seed() {
  await AppDataSource.initialize();

  const companyRepository = AppDataSource.getRepository(Company);
  const userRepo = AppDataSource.getRepository(User);
  const sourceRepository = AppDataSource.getRepository(Source);
  const insightRepo = AppDataSource.getRepository(Insight);
  const tagRepo = AppDataSource.getRepository(Tag);

  // Seed Companies
  const company1 = companyRepository.create({
    name: "Tech Innovators",
    domain: "techinnovators.com",
  });
  const company2 = companyRepository.create({
    name: "Green Solutions",
    domain: "greensolutions.com",
  });
  await companyRepository.save([company1, company2]);

  // Seed Sources
  const source1 = sourceRepository.create({ name: "Website" });
  const source2 = sourceRepository.create({ name: "Customer Feedback" });
  const source3 = sourceRepository.create({ name: "Internal Research" });
  await sourceRepository.save([source1, source2, source3]);

  // Associate Sources with Companies
  company1.sources = [source1, source2];
  company2.sources = [source2, source3];
  await companyRepository.save([company1, company2]);

  // Seed Users
  const user1 = userRepo.create({
    name: "John Doe",
    email: "john@techinnovators.com",
    is_active: true,
    company: company1,
  });
  const user2 = userRepo.create({
    name: "Jane Smith",
    email: "jane@greensolutions.com",
    is_active: true,
    company: company2,
  });
  await userRepo.save([user1, user2]);

  // Associate Sources with Users
  user1.sources = [source1, source2];
  user2.sources = [source2, source3];
  await userRepo.save([user1, user2]);

  // Seed Tags
  const tag1 = tagRepo.create({ text: "Innovation", company: company1 });
  const tag2 = tagRepo.create({
    text: "Customer Experience",
    company: company1,
  });
  const tag3 = tagRepo.create({ text: "Sustainability", company: company2 });
  await tagRepo.save([tag1, tag2, tag3]);

  // Seed Insights
  const insight1 = insightRepo.create({
    text: "New product idea from website analytics",
    user: user1,
    company: company1,
    source: source1,
  });
  const insight2 = insightRepo.create({
    text: "Customers requesting more eco-friendly packaging",
    user: user2,
    company: company2,
    source: source2,
  });
  await insightRepo.save([insight1, insight2]);

  // Associate Tags with Insights
  insight1.tags = [tag1, tag2];
  insight2.tags = [tag3];
  await insightRepo.save([insight1, insight2]);

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
