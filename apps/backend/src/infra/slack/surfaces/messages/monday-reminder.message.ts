import { Blocks, Elements, Message } from 'slack-block-builder';

export default () => {
  return Message({ text: 'Happy Monday!' })
    .blocks(
      Blocks.Section({ text: 'Happy Monday!' }),
      Blocks.Section({
        text: 'We almost have enough insights to give you a Weekly/Monthly digested summary. Remember to submit your insight(s) this week!',
      }),
      Blocks.Actions().elements(
        Elements.Button({ text: ':envelope_with_arrow: Submit an Insight' })
          .actionId('open_insight_modal')
          .primary()
      )
    )
    .buildToObject();
};
