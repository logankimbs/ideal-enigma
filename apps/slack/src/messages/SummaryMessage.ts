import { Block, KnownBlock, SectionBlock } from "@slack/types";
import { IMessage, Message, SummaryMessageOptions } from '../types';
import { createHeaderSection, createSectionBlock } from '../utils/blocks';
import { SummaryThemeV1 } from '@ideal-enigma/common';

class SummaryMessage implements IMessage {
  public getMessage({ summary, count }: SummaryMessageOptions): Message {
    const intro = this.buildIntro(count);
    const keyThemes = this.buildKeyThemes(summary.themes);
    const immediateActions = this.buildImmediateActions(summary.actions);

    const blocks: (KnownBlock | Block)[] = [
      createSectionBlock('plain_text', 'Happy Monday!'),
      createSectionBlock('plain_text', intro),
      createHeaderSection('Key Themes'),
      ...keyThemes,
      createHeaderSection('Immediate Actions'),
      createSectionBlock('mrkdwn', immediateActions),
      createSectionBlock('plain_text', summary.conclusion),
    ];

    // Fallback for when no blocks are built
    const text = `${intro} ${summary.conclusion}`;

    return { text, blocks };
  }

  private buildIntro(count: number) {
    return `This week, ${count} insights were submitted across various teams, highlighting trends, challenges, and opportunities aligned with the company's strategic objectives. Below is a summary of the most critical insights and actionable steps.`;
  }

  private buildKeyThemes(themes: SummaryThemeV1[]): SectionBlock[] {
    return themes.map((value, index) => {
      const title = `*${index + 1}. ${value.title}*\n\n`;
      const objective = `*Objective:* ${value.objective}\n`;
      const trend = `*Trend:* ${value.trend}\n`;
      const insight = `*Actionable Insight:* ${value.insight.interpretation}`;
      const text = `${title}${objective}${trend}${insight}`;

      return createSectionBlock('mrkdwn', text);
    });
  }

  private buildImmediateActions(actions: string[]): string {
    return actions.map((action) => `• ${action}`).join('\n');
  }
}

export const summaryMessage = new SummaryMessage();
