import { OPEN_MODAL } from "../listeners/actions/open-modal";

const createHeaderBlock = (text: string): any => ({
  type: "header",
  text: {
    type: "plain_text",
    text: text,
    emoji: true,
  },
});

const createSectionBlock = (text: string, button?: any): any => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: text,
  },
  accessory: button,
});

const createButton = (text: string, actionId: string): any => ({
  type: "button",
  text: {
    type: "plain_text",
    text: text,
    emoji: true,
  },
  action_id: actionId,
});

const createDividerBlock = (): any => ({
  type: "divider",
});

const createRichTextBlock = (elements: any[]): any => ({
  type: "rich_text",
  elements: elements,
});

const createRichTextSection = (text: string): any => ({
  type: "rich_text_section",
  elements: [
    {
      type: "text",
      text: text,
    },
  ],
});

const createRichTextList = (elements: any[]): any => ({
  type: "rich_text_list",
  style: "bullet",
  elements: elements,
});

export const getHomeBlocks = () => {
  return [
    createHeaderBlock("👋 Meet Echo"),
    createSectionBlock(
      "I'm here to help you recall and submit your weekly insights and share them with your teammates in order to circulate and accelerate the rate at which your team can build, measure, and learn. By frequently sharing the insights that come out of your work, you are contributing to building a culture of continuous learning. You will also be able to search and review other teammates' insights and engage in conversation about the learnings.",
      createButton("Learn More", "learn_more"),
    ),
    createDividerBlock(),
    createSectionBlock(
      "*What makes an insight impactful?*\n\nAn impactful insight is one that drives meaningful action, leading to improved performance, user satisfaction, and business growth. Here are key characteristics that make an insight impactful:\n\n",
      createButton("Impactful Insights", "try_journeys"),
    ),
    createRichTextBlock([
      createRichTextSection("1. Actionable\n"),
      createRichTextList([
        createRichTextSection(
          "Clear Recommendations: Insights should come with clear, actionable recommendations that teams can act on.",
        ),
        createRichTextSection(
          "Specificity: General observations are less useful than specific, detailed insights that pinpoint exact areas for improvement or opportunity.",
        ),
      ]),
    ]),
    createRichTextBlock([
      createRichTextSection("2. Data-Driven\n"),
      createRichTextList([
        createRichTextSection(
          "Evidence-Based: Insights should be grounded in concrete qualitative or quantitative data, ensuring they are reliable and credible.",
        ),
        createRichTextSection(
          "Quantifiable Impact: The potential impact of acting on the insight should be measurable, helping to prioritize actions based on expected outcomes.",
        ),
      ]),
    ]),
    createRichTextBlock([
      createRichTextSection("3. Relevant and Timely\n"),
      createRichTextList([
        createRichTextSection(
          "Aligned with Business Goals: Insights should be relevant to the company’s strategic objectives, helping to drive key metrics like user retention, revenue growth, or operational efficiency.",
        ),
        createRichTextSection(
          "Near Real-Time: The faster an insight can be derived and acted upon, the more valuable it is. Timely insights can help in quickly adapting to changing conditions or user feedback.",
        ),
      ]),
    ]),
    createRichTextBlock([
      createRichTextSection("4. Clearly Communicated\n"),
      createRichTextList([
        createRichTextSection(
          "Concise and Clear Presentation: Insights should be communicated clearly, avoiding jargon and ensuring they are understandable to all stakeholders.",
        ),
        createRichTextSection(
          "Visual Representation: Linking out to documents or presentations that leverage visual aids like charts, graphs, and dashboards can help in better understanding and lead to quick decision-making.",
        ),
      ]),
    ]),
    createDividerBlock(),
    createRichTextBlock([
      createRichTextSection("Here is a good example of an impactful insight:"),
    ]),
    createRichTextBlock([
      {
        type: "rich_text_quote",
        elements: [
          {
            type: "text",
            text: "Analyzing user behavior has revealed that simplifying the onboarding process by reducing the steps from 8 to 5 increases user activation rates by 30%, indicating a clear path to enhancing user retention and satisfaction.",
          },
        ],
      },
    ]),
    createHeaderBlock("Do More With Echo"),
    createSectionBlock(
      "📄 *Submit a Quick Insight*\nCreate an Intros, Watercooler, or Celebrations channel.",
      createButton("Submit an Insight", OPEN_MODAL),
    ),
    createSectionBlock(
      "📊 *Visit Your Echo Dashboard*\nSearch through your entire team's learning and engage in discussion.",
      createButton("Visit Echo Dashboard", "start_donut_channel"),
    ),
    createSectionBlock(
      "🔥 *My History*\nView your past submissions and streaks.",
      createButton("History and Streaks", "start_donut_channel"),
    ),
  ];
};
