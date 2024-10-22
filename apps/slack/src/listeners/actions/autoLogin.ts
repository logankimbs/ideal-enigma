import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";

// This actions sole purpose is to acknowledge the button click to go to dashboard
const autoLogin = async ({
  ack,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
  } catch (error) {
    console.error(error);
  }
};

export default autoLogin;
