import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Source } from "./entities";
import { SourceRepository } from "./repositories";

async function seed() {
  await AppDataSource.initialize();

  const slack = new Source();
  slack.name = "slack";
  const obj = await SourceRepository.save(slack);
  console.log(obj);

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log("Error seeding data:", error));
