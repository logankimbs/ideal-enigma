export function welcomeMessage(userId: string) {
  const intro =
    "I'm Loop, your friendly companion for capturing and sharing insights with your team. The more we contribute the faster we can Build, Measure, and Learn. Together, we can drive growth and create something amazing.";

  return {
    channel: userId,
    text: intro,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hi <@${userId}> :wave:`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: intro,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Here are some ways to get started:',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🚀 Submit an Insight',
              emoji: true,
            },
            value: 'open_insight_modal',
            action_id: 'open_insight_modal',
          },
        ],
      },
    ],
  };
}
