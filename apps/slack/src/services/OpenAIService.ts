import { Insight, SummaryData } from '@ideal-enigma/common';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import logger from '../utils/logger';

// IMPORTANT!!!
// These zonds represent VERSION 1 on our summaries.
// TODO: Find a better way of doing this.
const InsightSchema = z.object({
  origin: z.object({
    id: z.string(),
    userId: z.string(),
    // insights: z.string(),
    text: z.string(),
  }),
  // interpretation: z.string(),
});

const ImmediateActionSchema = z.object({
  text: z.string(),
  responsibility: z.string(),
});

const ThemeSchema = z.object({
  title: z.string(),
  objective: z.string(),
  themeSummary: z.string(),
  // trend: z.string(),
  // insights: InsightSchema,
  insights: z.array(InsightSchema),
  action: z.string(),
  responsibility: z.string(),
});

const SummaryResponseSchema = z.object({
  themes: z.array(ThemeSchema),
  // actions: z.array(z.string()),
  actions: z.array(ImmediateActionSchema),
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
  public async summarizeInsights(insights: Insight[]): Promise<SummaryData> {
    try {
      const origins = insights.map((insight) => ({
        id: insight.id,
        userId: insight.user.id,
        // insights: insights.text,
        text: insight.text,
      }));

      const summaryRequest = { insights: origins };

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-2024-08-06',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `
You are a skilled project manager tasked with analyzing a list of team member insights. Please perform the following tasks:
1. Filter Out Invalid Entries:
   - Exclude any entries that are gibberish, nonsensical, or clearly invalid.
2. Summarize Valid Insights:
   - Concisely summarize each valid insight, focusing on key points and essential information.
3. Group Similar Insights Under Key Themes:
   - Identify common themes or categories among the insights.
   - Assign a clear and descriptive title to each theme.
5. Enhance Each Theme with Specific Details:
   - For each theme, include the following components:
      - Objective: A brief statement outlining the goal related to the theme.
      - Summary: A brief summary of the insights related to the theme.
6. Insights:
   - Provide specific examples or data points from the insights that support the theme.
   - Actionable Insight: A clear recommendation or action that should be taken based on the insights.
   - Responsibility: Specify the team or department responsible for implementing the action.
5. Compile Immediate Actions:
   - List the actionable recommendations derived from the insights.
   - Include the responsible team or department for each action item.
6. Provide a Conclusion:
   - Summarize the key takeaways from the week's insights.
   - Emphasize how addressing these areas will benefit the organization.
7. Formatting Guidelines:
   - Adhere strictly to the standardized output format provided below.
   - Do not include any additional commentary or alter the structure.
   - Use clear and professional language suitable for sharing with the company's leadership team.
8. Tone and Language: Use professional and objective language suitable for an executive audience.

9. Confidentiality: Ensure that any sensitive or confidential information is handled appropriately.

10. No Personal Opinions: Focus solely on summarizing and organizing the insights as instructed.

---

### Key Themes

1. [Theme Title]

- Objective: [Brief objective related to the theme.]

- Summary: [Brief summary of insights related to theme.]

- Insights:
  - "[Specific example or data point from an insight.]"

- Actionable Insight: [Recommendation or action to be taken.]

- Responsibility: [Team or department responsible.]

2. [Theme Title]

- Objective: [Brief objective related to the theme.]

- Summary: [Brief summary of insights related to theme.]

- Insights:
  - "[Specific example or data point from an insight.]"

- Actionable Insight: [Recommendation or action to be taken.]

- Responsibility: [Team or department responsible.]

...

---

 Immediate Actions

1. [Action Item]

   - Responsibility:*[Team or department responsible.]

2. [Action Item]

   - `,
          },
          { role: 'user', content: JSON.stringify(summaryRequest) },
        ],
        response_format: zodResponseFormat(SummaryResponseSchema, 'summary'),
        // temperature: 0.7,
        // max_tokens: MAX_TOKENS,
      });

      const message = completion.choices[0]?.message;

      if (message?.content) {
        return JSON.parse(message.content) as SummaryData;
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
