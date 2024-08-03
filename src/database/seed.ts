import "reflect-metadata";
import { AppDataSource } from "./data-source";

async function seed() {
  await AppDataSource.initialize();
  // create companies
  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
