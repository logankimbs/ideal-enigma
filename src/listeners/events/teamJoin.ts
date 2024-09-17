import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import logger from "../../utils/logger";
import { teamRepo, userRepo } from "../../repositories";
import { UserEntity } from "../../entities";
import { UserData } from "../../types";

const teamJoin = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join">) => {
  logger.info(`Adding new user to team ${event.user.team_id}`);

  try {
    const data = event.user;
    const team = await teamRepo.findOneByOrFail({ id: data.team_id });
    const user = {
      id: data.id,
      team,
      data: data as UserData,
    } as UserEntity;

    userRepo.save(user);

    logger.info(`Saved new user ${data.id}`);
  } catch (error) {
    logger.error("Error saving new user:", error);
  }
};

export default teamJoin;
