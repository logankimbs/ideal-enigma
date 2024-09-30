import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { userRepo } from "../../repositories";
import { UserData } from "../../types";
import logger from "../../utils/logger";

const userProfileChanged = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"user_profile_changed">) => {
  try {
    const data = event.user as UserData;
    userRepo.save({ id: data.id, data });

    logger.info(`User ${data.id} successfully updated`);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export default userProfileChanged;
