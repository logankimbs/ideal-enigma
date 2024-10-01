import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { getDatasource, UserEntity } from "@idealgma/datasource";
import { UserData } from "../../types";
import logger from "../../utils/logger";

const userProfileChanged = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"user_profile_changed">) => {
  const datasource = getDatasource();
  const userRepository = datasource.getRepository(UserEntity);

  try {
    const data = event.user as UserData;

    await userRepository.save({ id: data.id, data });

    logger.info(`User ${data.id} successfully updated`);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export default userProfileChanged;
