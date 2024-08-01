import { Company } from "./entities/Company";
import { User } from "./entities/User";
import { Insight } from "./entities/Insight";
import { Tag } from "./entities/Tag";
import { InsightTag } from "./entities/InsightTag";
import { Integration } from "./entities/Integration";
import { CompanyIntegration } from "./entities/CompanyIntegration";
import { UserIntegration } from "./entities/UserIntegration";
import { AppDataSource } from "./data-source";

async function seed() {
  await AppDataSource.initialize();

  // Create Companies
  const company1 = new Company();
  company1.name = "Company One";
  company1.domain = "companyone.com";
  await AppDataSource.manager.save(company1);

  const company2 = new Company();
  company2.name = "Company Two";
  company2.domain = "companytwo.com";
  await AppDataSource.manager.save(company2);

  // Create Users
  const user1 = new User();
  user1.name = "John Doe";
  user1.email = "john@companyone.com";
  user1.company = company1;
  user1.is_active = true;
  await AppDataSource.manager.save(user1);

  const user2 = new User();
  user2.name = "Jane Smith";
  user2.email = "jane@companytwo.com";
  user2.company = company2;
  user2.is_active = true;
  await AppDataSource.manager.save(user2);

  // Create Integrations
  const integration1 = new Integration();
  integration1.integration_type = "slack";
  await AppDataSource.manager.save(integration1);

  const integration2 = new Integration();
  integration2.integration_type = "teams";
  await AppDataSource.manager.save(integration2);

  // Create Company Integrations
  const companyIntegration1 = new CompanyIntegration();
  companyIntegration1.company = company1;
  companyIntegration1.integration = integration1;
  await AppDataSource.manager.save(companyIntegration1);

  const companyIntegration2 = new CompanyIntegration();
  companyIntegration2.company = company2;
  companyIntegration2.integration = integration2;
  await AppDataSource.manager.save(companyIntegration2);

  // Create Insights
  const insight1 = new Insight();
  insight1.text = "This is an insight from John Doe";
  insight1.source = "slack";
  insight1.user = user1;
  insight1.company = company1;
  await AppDataSource.manager.save(insight1);

  const insight2 = new Insight();
  insight2.text = "This is an insight from Jane Smith";
  insight2.source = "teams";
  insight2.user = user2;
  insight2.company = company2;
  await AppDataSource.manager.save(insight2);

  // Create Tags
  const tag1 = new Tag();
  tag1.text = "Important";
  tag1.company = company1;
  await AppDataSource.manager.save(tag1);

  const tag2 = new Tag();
  tag2.text = "Urgent";
  tag2.company = company2;
  await AppDataSource.manager.save(tag2);

  // Create Insight Tags
  const insightTag1 = new InsightTag();
  insightTag1.insight = insight1;
  insightTag1.tag = tag1;
  await AppDataSource.manager.save(insightTag1);

  const insightTag2 = new InsightTag();
  insightTag2.insight = insight2;
  insightTag2.tag = tag2;
  await AppDataSource.manager.save(insightTag2);

  // Create User Integrations
  const userIntegration1 = new UserIntegration();
  userIntegration1.user = user1;
  userIntegration1.integration = integration1;
  await AppDataSource.manager.save(userIntegration1);

  const userIntegration2 = new UserIntegration();
  userIntegration2.user = user2;
  userIntegration2.integration = integration2;
  await AppDataSource.manager.save(userIntegration2);

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
