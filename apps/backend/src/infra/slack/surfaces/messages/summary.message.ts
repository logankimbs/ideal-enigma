import { SummaryTextV3 } from '@ideal-enigma/common';
import { Blocks, bold, Message } from 'slack-block-builder';

export default (summary: SummaryTextV3) => {
  return Message({ text: summary.conclusion })
    .blocks(
      Blocks.Section({ text: ':tada: Happy Monday!' }),
      Blocks.Section({
        text: 'During the most recent cycle, insights were gathered from teams, highlighting key trends, challenges, and opportunities. Here’s a summary of the most critical takeaways and recommended actions.',
      }),

      Blocks.Header({ text: 'Key Themes' }),
      ...summary.themes.flatMap((theme, i) => [
        Blocks.Section({ text: bold(`${++i}. ${theme.title}`) }),
        Blocks.Section({ text: theme.summary }),
        Blocks.Section({ text: `${bold('Objective')}: ${theme.objective}` }),
      ]),

      Blocks.Header({ text: 'Action Items' }),
      ...summary.themes.flatMap((theme) => [
        Blocks.Section({
          text: `${theme.action.description} ${bold(
            theme.action.owners.join(', ')
          )}`,
        }),
      ]),

      Blocks.Header({ text: 'Conclusion' }),
      Blocks.Section({ text: summary.conclusion }),

      Blocks.Divider(),
      Blocks.Context().elements(
        ':sparkles: This message was generated using artificial intelligence.'
      )
    )
    .buildToObject();
};
