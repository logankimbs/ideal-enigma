export const blocks = {
  reminder: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Hey!*\n\nLooks like its time to report your learnings.`,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
            emoji: true,
          },
          style: "primary",
          value: "click_me_123",
          action_id: "open_modal",
        },
      ],
    },
  ],
  modal: [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "We hope you accomplished a lot this week! More importantly, we hope you learned a lot. Submitting and sharing these learnings with your team will empower the entire organization to move faster and smarter.",
      },
    },
    {
      type: "input",
      block_id: "input_block_id",
      label: {
        type: "plain_text",
        text: "What was the most impactful thing you learned this week?",
      },
      element: {
        type: "plain_text_input",
        action_id: "sample_input_id",
        multiline: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "For guidance on what makes a learning impactful, <https://google.com|click here>.",
        },
      ],
    },
  ],
};
