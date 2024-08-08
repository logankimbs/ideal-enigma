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

    // Create a new SlackInstallation entity
    const newInstallation = new SlackInstallation();
    if (installation.team) {
      newInstallation.team = {
        id: installation.team.id,
        name: installation.team.name || "", // Ensure name is a string
      };
    } else {
      newInstallation.team = undefined;
    }

    if (installation.enterprise) {
      newInstallation.enterprise = {
        id: installation.enterprise.id,
        name: installation.enterprise.name || "", // Ensure name is a string
      };
    } else {
      newInstallation.enterprise = undefined;
    }

    newInstallation.user = installation.user;
    newInstallation.token_type = installation.tokenType || "";
    newInstallation.is_enterprise_install =
      installation.isEnterpriseInstall || false;
    newInstallation.app_id = installation.appId || "";
    newInstallation.auth_version = installation.authVersion || "";
    if (installation.bot) {
      newInstallation.bot = {
        scopes: installation.bot.scopes,
        token: installation.bot.token,
        user_id: installation.bot.userId,
        id: installation.bot.id,
      };
    }
    newInstallation.enterprise_url = installation.enterpriseUrl || "";

    // Save installation
    const savedInstallation =
      await SlackInstallationRepository.save(newInstallation);
    console.log("Slack Installation", savedInstallation);
    return;
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
