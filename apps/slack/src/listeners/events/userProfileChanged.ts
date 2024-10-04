import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import config from "../../config";
import { apiRequest } from "../../utils/apiRequest";
import logger from "../../utils/logger";

const userProfileChanged = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"user_profile_changed">) => {
  try {
    await apiRequest({
      method: "put",
      url: config.apiUrl + "/user",
      data: event.user,
    });

    logger.info("User updated");
  } catch (error) {
    logger.error(`Error updating user: ${error}`);
  }
};

export default userProfileChanged;
