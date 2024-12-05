import {
  SummaryActionV2,
  SummaryThemeV1,
  SummaryThemeV2,
} from '@ideal-enigma/common';
import { Block, KnownBlock, SectionBlock } from '@slack/types';
import { IMessage, Message, SummaryMessageOptions } from '../types';
import { createHeaderSection, createSectionBlock } from '../utils/blocks';

class SummaryMessage implements IMessage {
  public getMessage({ summary, count }: SummaryMessageOptions): Message {
    console.log('summary', summary);
    if (summary.version == 1) {
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

    if (summary.version == 2) {
      const intro = this.buildIntro(count);
      const keyThemes = this.buildKeyThemesV2(summary.themes);
      const immediateActions = this.buildImmediateActionsV2(summary.actions);

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

      console.log('text', text);
      console.log('blocks', blocks);

      return { text, blocks };
    }
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

  private buildKeyThemesV2(themes: SummaryThemeV2[]): SectionBlock[] {
    return themes.map((value, index) => {
      const title = `*${index + 1}. ${value.title}*\n\n`;
      const objective = `*Objective:* ${value.objective}\n`;
      const insights = value.insights.map((insight) => {
        return `- ${insight.origin.text}`;
      });
      const insightText = insights.join('\n');
      const text = `${title}${objective}insights:\n${insightText}`;

      return createSectionBlock('mrkdwn', text);
    });
  }

  private buildImmediateActions(actions: string[]): string {
    return actions.map((action) => `• ${action}`).join('\n');
  }

  private buildImmediateActionsV2(actions: SummaryActionV2[]): string {
    console.log('actions', actions);
    return actions
      .map(
        (action) =>
          `• ${action.text}\n\t- *Responsibility:* ${action.responsibility}`
      )
      .join('\n');
  }
}

export const summaryMessage = new SummaryMessage();
