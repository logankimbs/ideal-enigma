import { Blocks, Elements, Message, user } from 'slack-block-builder';

export default (userId: string) => {
  // Todo: come up with a better way to redirect user to dashboard
  const dashboardUrl = new URL(
    `${process.env.BACKEND_URL}/auth/slack?${new URLSearchParams({
      user: userId,
    })}`
  ).toString();
  const text =
    "I'm Loop, your friendly companion for capturing and sharing insights with your team. The more we contribute the faster we can Build, Measure, and Learn. Together, we can drive growth and create something amazing.";

  return Message({ channel: userId, text })
    .blocks(
      Blocks.Section({ text: `Hi ${user(userId)} :wave:` }),
      Blocks.Section({ text }),
      Blocks.Section({ text: 'Here are some ways to get started:' }),
      Blocks.Actions().elements(
        Elements.Button({ text: ':envelope_with_arrow: Submit an Insight' })
          .actionId('open_insight_modal')
          .primary(),
        Elements.Button({
          text: ':chart_with_upwards_trend: Visit Loop Dashboard',
        })
          .actionId('visit_dashboard')
          .url(dashboardUrl)
      )
    )
    .buildToObject();
};
