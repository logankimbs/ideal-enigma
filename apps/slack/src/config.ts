import { Config } from "./types";
import dotenv from "dotenv";

dotenv.config();

let config: Config | null = null;

const getConfig = () => {
  if (config) return config;

  config = {
    apiUrl: process.env.API_URL || "http://localhost:3001/",
    nodeEnv: process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV === "development",
    port: process.env.PORT || "3000",
    receiver: {
      signingSecret: process.env.SLACK_SIGNING_SECRET!,
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      stateSecret: process.env.SLACK_STATE_SECRET,
    },
    openAI: { apiKey: process.env.OPENAI_API_KEY },
  };

  return config;
};

export default getConfig();
