import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  slackClientId: process.env.SLACK_CLIENT_ID || "",
  slackClientSecret: process.env.SLACK_CLIENT_SECRET || "",
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET || "",
  slackAppToken: process.env.SLACK_APP_TOKEN || "",
  slackBotToken: process.env.SLACK_BOT_TOKEN || "",
  stateSecret: process.env.STATE_SECRET || "my-state-secret",
  port: parseInt(process.env.PORT || "3000", 10),
  scopes: ["chat:write", "users:read", "users:read.email", "team:read"],
};

export { datasource } from "./datasource";
