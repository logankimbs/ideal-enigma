import { Installation, InstallationQuery } from "@slack/bolt";
import { installationService } from "../../src/services/InstallationService";
import { installationRepo } from "../../src/repositories";
import logger from "../../src/utils/logger";

jest.mock("../../src/repositories");
jest.mock("../../src/utils/logger");

describe("InstallationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("storeInstallation", () => {
    it("should log warning and return early for enterprise installations", async () => {
      const loggerSpy = jest.spyOn(logger, "warn");

      await installationService.storeInstallation(enterpriseInstall);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Enterprise wide app installation is not yet supported",
      );
    });

    // TODO: Implement test
    it("should handle single team installation", async () => {});

    it("should log error if installation is missing required information", async () => {
      const loggerSpy = jest.spyOn(logger, "error");

      await installationService.storeInstallation({} as Installation);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Failed to save installation:",
        expect.any(Error),
      );
    });
  });

  describe("fetchInstallation", () => {
    it("should fetch and return team installation successfully", async () => {
      (installationRepo.findOneBy as jest.Mock).mockResolvedValue({
        id: teamInstall.team?.id,
        data: teamInstall,
      });

      const result = await installationService.fetchInstallation(teamQuery);

      expect(installationRepo.findOneBy).toHaveBeenCalledWith({
        id: teamInstall.team?.id,
      });
      expect(result).toEqual(teamInstall);
    });

    it("should throw an error if no installation is found", async () => {
      (installationRepo.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(
        installationService.fetchInstallation(teamQuery),
      ).rejects.toThrow("Installation was not found.");
    });
  });

  describe("deleteInstallation", () => {
    it("should delete installation successfully", async () => {
      (installationRepo.softDelete as jest.Mock).mockResolvedValue({});

      await installationService.deleteInstallation?.(teamQuery);

      expect(installationRepo.softDelete).toHaveBeenCalledWith({
        id: teamQuery.teamId,
      });
    });

    it("should log error if deletion of installation failed", async () => {
      const mockError = new Error("Database error");
      (installationRepo.softDelete as jest.Mock).mockRejectedValue(mockError);

      await installationService.deleteInstallation!(teamQuery);

      expect(installationRepo.softDelete).toHaveBeenCalledWith({
        id: teamQuery.teamId,
      });

      expect(logger.error).toHaveBeenCalledWith(
        "Error deleting installation:",
        mockError,
      );
    });
  });
});

const enterpriseInstall: Installation<"v1" | "v2", boolean> = {
  team: undefined,
  enterprise: { id: "E0000000001", name: "laboratories" },
  user: { token: undefined, scopes: undefined, id: "U0000000001" },
  tokenType: "bot",
  isEnterpriseInstall: true,
  appId: "A0000000001",
  authVersion: "v2",
  bot: {
    scopes: ["chat:write"],
    token: "xoxb-000001-00*********-********************",
    userId: "U0000000002",
    id: "B0000000001",
  },
};

const enterpriseTeamInstall: Installation<"v1" | "v2", boolean> = {
  team: { id: "T0000000001", name: "experimental-sandbox" },
  enterprise: { id: "E0000000001", name: "laboratories" },
  user: { token: undefined, scopes: undefined, id: "U0000000001" },
  tokenType: "bot",
  isEnterpriseInstall: false,
  appId: "A0000000001",
  authVersion: "v2",
  bot: {
    scopes: ["chat:write"],
    token: "xoxb-000001-00*********-********************",
    userId: "U0000000002",
    id: "B0000000001",
  },
};

const teamInstall: Installation<"v1" | "v2", boolean> = {
  team: { id: "T0000000001", name: "experimental-sandbox" },
  enterprise: undefined,
  user: { token: undefined, scopes: undefined, id: "U0000000001" },
  tokenType: "bot",
  isEnterpriseInstall: false,
  appId: "A0000000001",
  authVersion: "v2",
  bot: {
    scopes: ["chat:write"],
    token: "xoxb-000001-00*********-********************",
    userId: "U0000000002",
    id: "B0000000001",
  },
};

const teamQuery: InstallationQuery<boolean> = {
  userId: "U0000000001",
  isEnterpriseInstall: false,
  teamId: "T0000000001",
  enterpriseId: undefined,
  conversationId: "D0000000001",
};
