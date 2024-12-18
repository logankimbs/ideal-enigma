import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';

// The constants in this file do nothing but acknowledge a button click with a url.
// This is important so slack doesn't throw an error.
export const visitDashboard = async ({
  ack,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
  } catch (error) {
    console.error(error);
  }
};

export const learnMore = async ({
  ack,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
  } catch (error) {
    console.error(error);
  }
};

export const impactfulInsights = async ({
  ack,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
  } catch (error) {
    console.error(error);
  }
};
