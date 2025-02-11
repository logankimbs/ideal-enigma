import { Blocks, bold, Elements, HomeTab } from 'slack-block-builder';

export default (user: string) => {
  // Todo: come up with a better way to redirect user to dashboard
  const dashboardUrl = new URL(
    `${process.env.BACKEND_URL}/auth/slack?${new URLSearchParams({ user })}`
  ).toString();

  return HomeTab()
    .blocks(
      Blocks.Actions().elements(
        Elements.Button({ text: ':envelope_with_arrow: Submit an Insight' })
          .actionId('open_insight_modal')
          .primary(),
        Elements.Button({
          text: ':chart_with_upwards_trend: Visit Loop Dashboard',
        })
          .actionId('visit_dashboard')
          .url(dashboardUrl),
        // Todo: use configService to get frontendUrl
        Elements.Button({ text: ':mag: Learn More' })
          .actionId('learn_more')
          .url(process.env.FRONTEND_URL),
        Elements.Button({ text: ':rocket: Impactful Insights' })
          .actionId('impactful_insights')
          .url(
            `${process.env.FRONTEND_URL}/blog/unlocking-growth-the-secret-behind-impactful-insights`
          )
      ),
      Blocks.Divider(),
      Blocks.Header({ text: ':wave: Meet Loop' }),
      Blocks.Section({
        text: "I'm here to help you recall and submit your weekly insights, share them with your teammates, and accelerate your team's ability to build, measure, and learn. By frequently sharing insights, you're contributing to a culture of continuous learning.",
      }),
      Blocks.Header({
        text: 'What makes an insight impactful?',
      }),
      Blocks.Section({
        text: `:one: ${bold(
          'Clear, Actionable, and Specific.'
        )} Insights should include specific recommendations that teams can act on right away.`,
      }),
      Blocks.Section({
        text: `:two: ${bold(
          'Data-Driven.'
        )} Ground insights in reliable data for credibility.`,
      }),
      Blocks.Section({
        text: `:three: ${bold(
          'Relevant and Timely.'
        )} Align insights with strategic goals to drive key metrics.`,
      }),
      Blocks.Section({
        text: `:four: ${bold(
          'Simple Communication.'
        )} Avoid jargon and keep insights understandable for anyone.`,
      }),
      Blocks.Section({
        text: `${bold(
          'Example'
        )}: Analyzing user behavior has revealed that simplifying the onboarding process by reducing the steps from 8 to 5 increases user activation rates by 30%.`,
      }),

      Blocks.Header({ text: ':first_place_medal: Do More with Loop' }),
      Blocks.Section({
        text: `${bold('Capture')} :memo:\n${bold(
          'Effortlessly capture employee insights'
        )}\nLoop seamlessly integrates with your team’s communication tools, making it simple to capture, organize, and share valuable insights across every department.`,
      }),
      Blocks.Section({
        text: `${bold('Centralize')} :globe_with_meridians:\n${bold(
          'Valuable information all in one place'
        )}\nBring all your team’s insights together in a unified, searchable repository, ensuring that the knowledge you need is always right at your fingertips.`,
      }),
      Blocks.Section({
        text: `${bold('Curate')} :robot_face:\n${bold(
          'Create actionable summaries from employee insights'
        )}\nLeverage AI-driven summaries that distill your team’s collective intelligence into easily digestible insights, helping everyone quickly understand the “why” behind the work.`,
      }),
      Blocks.Section({
        text: `${bold('Circulate')} :arrows_counterclockwise:\n${bold(
          'Automate the distribution of knowledge'
        )}\nKeep your team in the loop with timely summaries delivered directly to their workspace—sparking discussions, fueling follow-ups, and guiding next steps.`,
      }),
      Blocks.Section({
        text: `${bold('Cultivate')} :seedling:\n${bold(
          'Enable your team to operate with curiosity'
        )}\nEmpower your team to approach challenges with a growth mindset, turning shared insights into a culture of continuous learning and innovation.`,
      })
      // Todo: add footer with support email
    )
    .buildToObject();
};
