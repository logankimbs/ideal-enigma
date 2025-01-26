export type SlackConfig = {
  clientId: string;
  clientSecret: string;
  state: string;
  nonce: string;
  secretKey: string;
};

export default (): SlackConfig => ({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  state: process.env.SLACK_STATE_SECRET,
  nonce: process.env.SLACK_NONCE,
  secretKey: process.env.SLACK_SECRET_KEY,
});
