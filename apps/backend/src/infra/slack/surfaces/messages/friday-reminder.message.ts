import { Blocks, Elements, Message } from 'slack-block-builder';

export default () => {
  return Message({ text: 'Happy Friday! :tada:' })
    .blocks(
      Blocks.Section({ text: 'Happy Friday! :tada:' }),
      Blocks.Section({
        text: 'Time to wrap up the week and share those brilliant insights you’ve gathered. Don’t be shy—hit that submit button and let your team in on the good stuff. Let’s end the week on a high note!',
      }),
      Blocks.Actions().elements(
        Elements.Button({ text: ':envelope_with_arrow: Submit an Insight' })
          .actionId('open_insight_modal')
          .primary()
      )
    )
    .buildToObject();
};
