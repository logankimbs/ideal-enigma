import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";
import { ModalView } from "@slack/types";
import { INSIGHT_MODAL_TEXTS, SUBMIT_INSIGHT } from "../../constants";
import { insightService } from "../../services/InsightService";
import logger from "../../utils/logger";
import tagService from "../../services/TagService";

const getModalBlocks = () => [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: INSIGHT_MODAL_TEXTS.DESCRIPTION,
    },
  },
  {
    type: "input",
    block_id: "insight",
    element: {
      type: "plain_text_input",
      multiline: true,
      action_id: "input",
      placeholder: {
        type: "plain_text",
        text: INSIGHT_MODAL_TEXTS.PLACEHOLDER,
      },
    },
    label: {
      type: "plain_text",
      text: "Share your insight",
      emoji: true,
    },
  },
  {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: INSIGHT_MODAL_TEXTS.HELP_TEXT,
      },
    ],
  },
  {
    type: "input",
    optional: true,
    block_id: "tags",
    element: {
      type: "plain_text_input",
      action_id: "input",
      placeholder: {
        type: "plain_text",
        text: INSIGHT_MODAL_TEXTS.TAGS_PLACEHOLDER,
      },
    },
    label: {
      type: "plain_text",
      text: "Tag your insight",
      emoji: true,
    },
  },
  {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: INSIGHT_MODAL_TEXTS.PRO_TIP,
      },
    ],
  },
  {
    type: "input",
    optional: true,
    block_id: "link",
    element: {
      type: "plain_text_input",
      action_id: "input",
      placeholder: {
        type: "plain_text",
        text: INSIGHT_MODAL_TEXTS.LINKS_PLACEHOLDER,
      },
    },
    label: {
      type: "plain_text",
      text: "Attach a link",
      emoji: true,
    },
  },
];

export const insightModal: ModalView = {
  type: "modal",
  callback_id: SUBMIT_INSIGHT,
  title: {
    type: "plain_text",
    text: INSIGHT_MODAL_TEXTS.TITLE,
  },
  blocks: getModalBlocks(),
  submit: {
    type: "plain_text",
    text: INSIGHT_MODAL_TEXTS.SUBMIT_BUTTON,
  },
};

const submitInsight = async ({
  ack,
  view,
  body,
  client,
}: AllMiddlewareArgs & SlackViewMiddlewareArgs) => {
  await ack();

  try {
    const insight = view.state.values.insight.input.value!; // Required
    const tags = view.state.values.tags.input.value || undefined; // Optional
    const link = view.state.values.link.input.value || undefined; // Optional

    const savedTags = await tagService.parseAndSaveTags(tags);
    await insightService.saveInsight(body.user.id, insight, savedTags, link);

    // TODO: Figure out how to post message as user
    await client.chat.postMessage({
      channel: body.user.id,
      text: `${insight}`,
    });
  } catch (error) {
    logger.error(error);
  }
};

export default submitInsight;
