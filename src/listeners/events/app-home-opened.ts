import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { getHomeBlocks } from "../../blocks/home-blocks";

export const APP_HOME_OPENED_EVENT_NAME = "app_home_opened";

const appHomeOpenedCallback = async ({
  client,
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"app_home_opened">) => {
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== "home") return;

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: getHomeBlocks(),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default appHomeOpenedCallback;
