import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { getDatasource, TeamEntity, UserEntity } from "@idealgma/datasource";
import { UserData } from "../../types";
import logger from "../../utils/logger";

const teamJoin = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join">) => {
  logger.info(`Adding new user to team ${event.user.team_id}`);
  
  const datasource = getDatasource();
  const teamRepository = datasource.getRepository(TeamEntity)
  const userRepository = datasource.getRepository(UserEntity);

  try {
    const data = event.user;
    const team = await teamRepository.findOneByOrFail({ id: data.team_id });
    const user = {
      id: data.id,
      team,
      data: data as UserData,
    } as UserEntity;

    await userRepository.save(user);

    logger.info(`Saved new user ${data.id}`);
  } catch (error) {
    logger.error("Error saving new user:", error);
  }
};

export default teamJoin;
