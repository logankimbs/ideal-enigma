import { InsightEntity, UserEntity } from "../../src/entities";
import { insightRepo, userRepo } from "../../src/repositories";
import { insightService } from "../../src/services/InsightService";

jest.mock("../../src/repositories/UserRepo");
jest.mock("../../src/repositories/InsightRepo");

describe("InsightService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveInsight", () => {
    it("should save insight if user exists", async () => {
      const mockUser = { id: "user-id" } as UserEntity;
      const mockInsight = {
        text: "Sample insight text",
        user: mockUser,
      } as InsightEntity;

      (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
      (insightRepo.save as jest.Mock).mockResolvedValue(mockInsight);

      await insightService.saveInsight(mockUser.id, mockInsight.text);

      expect(userRepo.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(insightRepo.save).toHaveBeenCalledWith({
        text: mockInsight.text,
        user: mockUser,
        isSummarized: false,
      });
    });

    it("should not save insight if user does not exist", async () => {
      const mockUserId = "user-id";
      const mockText = "Sample insight text";

      (userRepo.findOne as jest.Mock).mockResolvedValue(null);

      await insightService.saveInsight(mockUserId, mockText);

      expect(userRepo.findOne).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
      expect(insightRepo.save).not.toHaveBeenCalled();
    });
  });
});
