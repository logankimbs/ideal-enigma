import { z } from "zod";

const InsightSchema = z.object({
  origin: z.object({
    userId: z.string(),
    insight: z.string(),
  }),
  interpretation: z.string(),
});

const ThemeSchema = z.object({
  title: z.string(),
  objective: z.string(),
  trend: z.string(),
  insight: InsightSchema,
});

export const SummaryResponseSchema = z.object({
  themes: z.array(ThemeSchema),
  actions: z.array(z.string()),
  conclusion: z.string(),
});

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("3000").transform(Number),
  SLACK_SIGNING_SECRET: z.string().min(1, "SLACK_SIGNING_SECRET is required"),
  SLACK_CLIENT_ID: z.string().optional(),
  SLACK_CLIENT_SECRET: z.string().optional(),
  SLACK_STATE_SECRET: z.string().default("default-state-secret"),
  DATABASE_HOST: z.string().min(1, "DATABASE_HOST is required"),
  DATABASE_NAME: z.string().min(1, "DATABASE_NAME is required"),
  DATABASE_USERNAME: z.string().min(1, "DATABASE_USERNAME is required"),
  DATABASE_PASSWORD: z.string().min(1, "DATABASE_PASSWORD is required"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
});
