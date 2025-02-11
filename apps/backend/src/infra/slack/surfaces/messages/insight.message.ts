import {
  blockquote,
  Blocks,
  bold,
  italic,
  Message,
  setIfTruthy,
  link as url,
} from 'slack-block-builder';
import { codeInline } from 'slack-block-builder/dist/md';

export default (
  userId: string,
  insight: string,
  themes?: string[],
  link?: string
) => {
  return Message({ channel: userId, text: insight })
    .blocks(
      Blocks.Section({
        text: `:tada: ${bold(
          'Thank you for sharing your insight!'
        )} Here's what you submitted:`,
      }),
      Blocks.Section({
        text: blockquote(
          `${italic(insight)} ${
            themes ? themes.flatMap((theme) => codeInline(theme)).join(' ') : ''
          }`
        ),
      }),
      setIfTruthy(link, [Blocks.Section({ text: url(link) })])
      // Todo: add visit dashboard button
    )
    .buildToObject();
};
