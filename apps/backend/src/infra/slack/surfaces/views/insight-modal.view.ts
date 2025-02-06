import { Blocks, bold, Elements, link, Modal } from 'slack-block-builder';

export default () => {
  return Modal({
    title: 'Submit an Insight',
    submit: 'Submit',
    callbackId: 'submit_insight',
  })
    .blocks(
      Blocks.Section({
        text: 'Your insights are invaluable. Share what you’ve learned to empower your team. Submit an insight and let’s achieve greatness together!',
      }),
      Blocks.Input({ label: 'Share your insight' })
        .element(
          Elements.TextInput({
            placeholder:
              'Try this format: I learned [x], by doing [y], therefore we should [z].',
          })
            .actionId('insight')
            .multiline()
        )
        .blockId('insight'),
      // Todo: use configService to get frontendUrl
      Blocks.Context().elements(
        `:bulb: Need tips for impactful insights? ${link(
          `${process.env.FRONTEND_URL}/blog/unlocking-growth-the-secret-behind-impactful-insights`,
          'Click here'
        )}.`
      ),
      Blocks.Input({ label: 'Tag your insight with a theme' })
        .element(
          Elements.TextInput({
            placeholder: 'marketing, launch, feedback',
          }).actionId('themes')
        )
        .blockId('themes')
        .optional(),
      Blocks.Context().elements(
        `:fire: ${bold(
          'Pro tip'
        )}: You can add multiple tags by separating them with commas.`
      ),
      Blocks.Input({ label: 'Attach a link' })
        .element(
          Elements.URLInput({
            placeholder: 'https://google.com',
          }).actionId('link')
        )
        .blockId('link')
        .optional()
    )
    .buildToObject();
};
