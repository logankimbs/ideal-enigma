import "reflect-metadata";
import { AppDataSource } from "./data-source";
import {
  Company,
  CompanyIntegration,
  Insight,
  InsightTag,
  Integration,
  Tag,
  User,
  UserIntegration,
} from "./entities";

async function clearTables() {
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // // Disable foreign key checks
    // await queryRunner.query(`SET session_replication_role = 'replica';`);

    // // Truncate all tables in the correct order to avoid foreign key constraint issues
    // await queryRunner.query(`TRUNCATE TABLE "insight_tags" CASCADE;`);
    // await queryRunner.query(`TRUNCATE TABLE "user_integrations" CASCADE;`);
    // await queryRunner.query(`TRUNCATE TABLE "company_integrations" CASCADE;`);
    // await queryRunner.query(`TRUNCATE TABLE "insights" CASCADE;`);
    // await queryRunner.query(`TRUNCATE TABLE "tags" CASCADE;`);
    // await queryRunner.query(`TRUNCATE TABLE "users" CASCADE;`);
    // await queryRunner.query(`TRUNCATE TABLE "integrations" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "companies" CASCADE;`);

    // Enable foreign key checks
    await queryRunner.query(`SET session_replication_role = 'origin';`);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

async function seed() {
  await AppDataSource.initialize();

  // Clear all tables before seeding
  await clearTables();

  // Create Companies
  const company1 = new Company();
  company1.name = "Apple";
  company1.domain = "https://www.apple.com/";
  await AppDataSource.manager.save(company1);

  const company2 = new Company();
  company2.name = "Amazon";
  company2.domain = "https://www.amazon.com/";
  await AppDataSource.manager.save(company2);

  // Create Users
  const user1 = new User();
  user1.name = "John Doe";
  user1.email = "john@apple.com";
  user1.company = company1;
  user1.is_active = true;
  await AppDataSource.manager.save(user1);

  const user2 = new User();
  user2.name = "Jane Smith";
  user2.email = "jane@amazon.com";
  user2.company = company2;
  user2.is_active = true;
  await AppDataSource.manager.save(user2);

  // // Create Integrations
  // const integration1 = new Integration();
  // integration1.integration_type = "slack";
  // await AppDataSource.manager.save(integration1);

  // // Create Company Integrations
  // const companyIntegration1 = new CompanyIntegration();
  // companyIntegration1.company = company1;
  // companyIntegration1.integration = integration1;
  // await AppDataSource.manager.save(companyIntegration1);

  // const companyIntegration2 = new CompanyIntegration();
  // companyIntegration2.company = company2;
  // companyIntegration2.integration = integration2;
  // await AppDataSource.manager.save(companyIntegration2);

  // Create Insights
  const insight1 = new Insight();
  insight1.text = "This is an insight from John Doe";
  insight1.source = "slack";
  insight1.user = user1;
  insight1.company = company1;
  await AppDataSource.manager.save(insight1);

  const insight2 = new Insight();
  insight2.text = "This is an insight from Jane Smith";
  insight2.source = "slack";
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

  // // Create Insight Tags
  // const insightTag1 = new InsightTag();
  // insightTag1.insight = insight1;
  // insightTag1.tag = tag1;
  // await AppDataSource.manager.save(insightTag1);

  // const insightTag2 = new InsightTag();
  // insightTag2.insight = insight2;
  // insightTag2.tag = tag2;
  // await AppDataSource.manager.save(insightTag2);

  // // Create User Integrations
  // const userIntegration1 = new UserIntegration();
  // userIntegration1.user = user1;
  // userIntegration1.integration = integration1;
  // await AppDataSource.manager.save(userIntegration1);

  // const userIntegration2 = new UserIntegration();
  // userIntegration2.user = user2;
  // userIntegration2.integration = integration2;
  // await AppDataSource.manager.save(userIntegration2);

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
