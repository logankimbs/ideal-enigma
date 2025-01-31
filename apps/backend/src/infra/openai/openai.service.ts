import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { readFile } from '../../common/utils/file.utils';
import { Insight } from '../database/entities/insight.entity';
import { SummarySchema } from './schemas/summary.schema';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(insights: Insight[]) {
    const content = this.sanitizeInsights(insights);

    try {
      const prompt = await readFile('../../assets/summary-prompt.txt');
      const response = await this.openai.beta.chat.completions.parse({
        model: 'gpt-4o-2024-08-06',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content },
        ],
        response_format: zodResponseFormat(SummarySchema, 'summary'),
      });

      return (
        response.choices[0]?.message?.content || 'No response from OpenAI.'
      );
    } catch (error) {
      console.error(error);
    }
  }

  private sanitizeInsights(insights: Insight[]) {
    return JSON.stringify({
      insights: insights.map((insight) => ({
        id: insight.id,
        text: insight.text,
      })),
    });
  }
}
