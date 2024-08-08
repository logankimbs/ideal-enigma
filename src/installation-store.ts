// installationStore.ts
import { Installation, InstallationStore } from "@slack/bolt";
import { Company, SlackInstallation } from "./database/entities";
import {
  CompanyRepository,
  SlackInstallationRepository,
  SourceRepository,
} from "./database/repositories";

const storeInstallation: InstallationStore["storeInstallation"] = async (
  installation: Installation,
) => {
  const { isEnterpriseInstall, enterprise } = installation;

  // Org-wide installation
  if (isEnterpriseInstall && enterprise !== undefined) {
    console.log("Org installation", installation);

    // Get the slack source from the source table
    const slackSource = await SourceRepository.findOneBy({ name: "slack" });
    console.log("Slack", slackSource);

    if (!slackSource) throw new Error("Slack source not found");

    // Create company
    const company = new Company();
    company.name = enterprise.name || "";
    company.sources = [slackSource];

    // Save company
    const savedCompany = await CompanyRepository.save(company);
    console.log("Company", savedCompany);

    SlackInstallationRepository.saveInstallation(installation);
  }
  // Single team installation
  if (installation.team !== undefined) {
    console.log(installation);
    return;
  }
  throw new Error("Failed saving installation data to installationStore");
};

const fetchInstallation: InstallationStore["fetchInstallation"] = async (
  installQuery,
) => {
  // Org-wide installation lookup
  if (
    installQuery.isEnterpriseInstall &&
    installQuery.enterpriseId !== undefined
  ) {
    //
  }
  // Single team installation lookup
  if (installQuery.teamId !== undefined) {
    // return tempDB.get(installQuery.teamId);
  }
  throw new Error("Failed fetching installation");
};

const deleteInstallation: InstallationStore["deleteInstallation"] = async (
  installQuery,
) => {
  // Org-wide installation deletion
  if (
    installQuery.isEnterpriseInstall &&
    installQuery.enterpriseId !== undefined
  ) {
    // tempDB.delete(installQuery.enterpriseId);
    return;
  }
  // Single team installation deletion
  if (installQuery.teamId !== undefined) {
    // tempDB.delete(installQuery.teamId);
    return;
  }
  throw new Error("Failed to delete installation");
};

export const installationStore = {
  storeInstallation,
  fetchInstallation,
  deleteInstallation,
};
