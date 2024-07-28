export const getModalBlocks = () => {
  const blockOne = {
    type: "section",
    text: {
      type: "plain_text",
      text: "We hope you accomplished a lot this week! More importantly, we hope you learned a lot. Submitting and sharing these learnings with your team will empower the entire organization to move faster and smarter.",
    },
  };

  const blockTwo = {
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
  };

  const blockThree = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: "For guidance on what makes a learning impactful, <https://google.com|click here>.",
      },
    ],
  };

  return [blockOne, blockTwo, blockThree];
};
