import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { InsightEntity } from "../entities";
import logger from "../utils/logger";
import { Summary } from "../types";

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

const SummaryResponseSchema = z.object({
  themes: z.array(ThemeSchema),
  actions: z.array(z.string()),
  conclusion: z.string(),
});

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Summarizes a list of insights using OpenAI with structured outputs.
   *
   * @param insights An array of InsightEntities to be summarized.
   * @returns The summary as a Summary object.
   */
  public async summarizeInsights(insights: InsightEntity[]): Promise<Summary> {
    const MAX_TOKENS = 2000;

    try {
      const origins = insights.map((insight) => ({
        userId: insight.user.id,
        insight: insight.text,
      }));

      const summaryRequest = { insights: origins };

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Please summarize the following insights." },
          { role: "user", content: JSON.stringify(summaryRequest) },
        ],
        response_format: zodResponseFormat(SummaryResponseSchema, "summary"),
        // temperature: 0.7,
        // max_tokens: MAX_TOKENS,
      });

      const message = completion.choices[0]?.message;

      if (message?.content) {
        return JSON.parse(message.content) as Summary;
      } else if (message?.refusal) {
        throw new Error(
          `Model refused to generate the summary: ${message.refusal}`,
        );
      } else {
        throw new Error(
          "Failed to generate summary: Unexpected response format.",
        );
      }
    } catch (error) {
      logger.error("Error while summarizing insights:", error);
      throw error;
    }
  }
}
