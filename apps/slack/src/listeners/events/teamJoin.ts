import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import config from "../../config";
import { apiRequest } from "../../utils/apiRequest";
import logger from "../../utils/logger";

const teamJoin = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join">) => {
  logger.info(`Adding user ${event.user.id}`);

  try {
    await apiRequest({
      method: "post",
      url: config.apiUrl + "/user",
      data: event.user,
    });

    logger.info("User added");
  } catch (error) {
    logger.error("Could not save user", error);
  }
};

export default teamJoin;
