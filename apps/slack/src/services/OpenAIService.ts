import { Insight, SummaryTextV1 } from '@ideal-enigma/common';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import logger from '../utils/logger';

// IMPORTANT!!!
// These zonds represent VERSION 1 on our summaries.
// TODO: Find a better way of doing this.
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
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

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
  public async summarizeInsights(insights: Insight[]): Promise<SummaryTextV1> {
    try {
      const origins = insights.map((insight) => ({
        userId: insight.user.id,
        insight: insight.text,
      }));

      const summaryRequest = { insights: origins };

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-2024-08-06',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `Act as skilled project manager. You are tasked with analyzing the provided list of team member insights. Please perform the following tasks:

First, filter out any entries that are gibberish, nonsensical, or clearly invalid.

Second, concisely summarize each valid insight, focusing on key points and essential information.

Third, group similar insights together under relevant common themes or categories, assigning a clear and descriptive title to each theme.

Fourth, ensure that the summaries are brief and highlight actionable information, emphasizing details most relevant to the entire company, especially the C-suite.

Fifth, adhere strictly to the standardized output format provided below for your response, regardless of the input content. Do not include any additional commentary or alter the structure.

Standardized Output Format:

[Week Starting MM/DD/YYYY - Week Ending MM/DD/YYYY]

Theme 1: [Theme Title]

Insight Summary 1

Insight Summary 2

...

Theme 2: [Theme Title]

Insight Summary 3

Insight Summary 4

...

Theme 3: [Theme Title]

Insight Summary 5

Insight Summary 6

...

Overall Summary:

Provide a brief paragraph summarizing the key takeaways from this week's insights, highlighting trends, successes, challenges, and opportunities.

Action Items:

List actionable recommendations based on the insights, formatted as plain text.

Additional Instructions:

Ensure that your final output strictly adheres to the standardized format and incorporates all the instructions provided. The goal is to deliver a clear, concise, and actionable summary that incorporates all the insights and can be directly shared with the company's leadership team.

Input:`,
          },
          { role: 'user', content: JSON.stringify(summaryRequest) },
        ],
        response_format: zodResponseFormat(SummaryResponseSchema, 'summary'),
        // temperature: 0.7,
        // max_tokens: MAX_TOKENS,
      });

      const message = completion.choices[0]?.message;

      if (message?.content) {
        return JSON.parse(message.content) as SummaryTextV1;
      } else if (message?.refusal) {
        throw new Error(
          `Model refused to generate the summary: ${message.refusal}`
        );
      } else {
        throw new Error(
          'Failed to generate summary: Unexpected response format.'
        );
      }
    } catch (error) {
      logger.error('Error while summarizing insights:', error);
      throw error;
    }
  }
}
