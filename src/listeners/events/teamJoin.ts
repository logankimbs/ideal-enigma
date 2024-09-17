import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import logger from "../../utils/logger";

const teamJoin = async ({
  client,
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join">) => {
  try {
    console.log("user added ");
    logger.info("client", client);
    logger.info("event", event);
    logger.info("user", event.user);
  } catch (error) {
    console.error("Error saving new user:", error);
  }
};

export default teamJoin;
