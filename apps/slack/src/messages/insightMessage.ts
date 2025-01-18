export function insightMessage(
  insight: string,
  themes: string[],
  link?: string
) {
  const mrkdwnThemes = themes.map((theme) => `\`${theme}\``).join(' ');
  const message = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ":tada: *Thank you for sharing your insight!* Here's what you submitted:",
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `>_${insight}_`,
      },
    },
  ];

  if (themes.length) {
    message.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: mrkdwnThemes,
      },
    });
  }

  if (link) {
    message.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `<${link}>`,
      },
    });
  }

  return message;
}
