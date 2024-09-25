import { z } from "zod";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("3000").transform(Number),
  SLACK_SIGNING_SECRET: z.string().min(1, "SLACK_SIGNING_SECRET is required"),
  SLACK_CLIENT_ID: z.string().optional(),
  SLACK_CLIENT_SECRET: z.string().optional(),
  SLACK_STATE_SECRET: z.string().default("default-state-secret"),
  SLACK_APP_TOKEN: z.string().optional(),
  SLACK_BOT_TOKEN: z.string().min(1, "SLACK_BOT_TOKEN is required"),
  DATABASE_HOST: z.string().min(1, "DATABASE_HOST is required"),
  DATABASE_NAME: z.string().min(1, "DATABASE_NAME is required"),
  DATABASE_USERNAME: z.string().min(1, "DATABASE_USERNAME is required"),
  DATABASE_PASSWORD: z.string().min(1, "DATABASE_PASSWORD is required"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
});

type Config = {
  nodeEnv: string;
  isDev: boolean;
  port: number;
  slack: {
    signingSecret: string;
    clientId?: string;
    clientSecret?: string;
    appToken?: string;
    botToken: string;
    stateSecret: string;
    scopes: string[];
  };
  database: {
    host: string;
    database: string;
    username: string;
    password: string;
  };
  openAI: { apiKey: string };
};

let configInstance: Config | null = null;

const getConfig = () => {
  if (configInstance) {
    return configInstance;
  }

  try {
    const env = envSchema.parse(process.env);
    const isDev = env.NODE_ENV === "development";

    configInstance = {
      nodeEnv: env.NODE_ENV,
      isDev,
      port: env.PORT,
      slack: {
        signingSecret: env.SLACK_SIGNING_SECRET,
        clientId: env.SLACK_CLIENT_ID,
        clientSecret: env.SLACK_CLIENT_SECRET,
        appToken: env.SLACK_APP_TOKEN,
        botToken: env.SLACK_BOT_TOKEN,
        stateSecret: env.SLACK_STATE_SECRET,
        scopes: ["chat:write", "users:read", "users:read.email", "team:read"],
      },
      database: {
        host: env.DATABASE_HOST,
        database: env.DATABASE_NAME,
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
      },
      openAI: { apiKey: env.OPENAI_API_KEY },
    };

    return configInstance;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => err.message).join(", ");
      logger.error(
        `Environment variable validation failed: ${formattedErrors}`,
      );
    } else {
      logger.error(
        "An unexpected error occurred during environment variable validation",
      );
    }

    // Terminate if environment variable validation fails
    process.exit(1);
  }
};

export default getConfig();
