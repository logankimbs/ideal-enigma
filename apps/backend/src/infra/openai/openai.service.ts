import { SummaryTextV3 } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { readFile } from '../../common/utils/file.utils';
import { summarySchema } from '../../modules/summaries/schemas/summary.schema';
import { Insight } from '../database/entities/insight.entity';

export type GenerateSummaryResponse = {
  data: SummaryTextV3;
  version: number;
};

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(insights: Insight[]): Promise<GenerateSummaryResponse> {
    const sanitizedInsights = this.sanitizeInsights(insights);

    try {
      const prompt = await readFile('../../assets/summary-prompt.txt');
      const response = await this.openai.beta.chat.completions.parse({
        model: 'gpt-4o-2024-08-06',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: sanitizedInsights },
        ],
        response_format: zodResponseFormat(summarySchema, 'summary'),
      });

      const summary = response.choices[0]?.message?.content;

      return { data: JSON.parse(summary) as SummaryTextV3, version: 3 };
    } catch (error) {
      console.error(error);
    }
  }

  // Todo: move to insights service
  private sanitizeInsights(insights: Insight[]) {
    return JSON.stringify({
      insights: insights.map((insight) => ({
        id: insight.id,
        text: insight.text,
      })),
    });
  }
}
