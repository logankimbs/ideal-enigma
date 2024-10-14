import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import config from "../../config";
import { apiRequest } from "../../utils/apiRequest";

const autoLogin = async ({
  ack,
  client,
  body,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
    const response: { access_token: string } = await apiRequest({
      method: "post",
      url: `${config.apiUrl}/auth/slack-login`,
      data: body.user,
    });

    console.log("response", response.access_token);
  } catch (error) {
    console.error(error);
  }
};

export default autoLogin;
