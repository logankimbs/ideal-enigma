import {
  HeaderBlock,
  KnownBlock,
  RichTextBlock,
  SectionBlock,
  TextObject,
} from "@slack/types";

export const createTextSection = (text: string): KnownBlock => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text,
  },
});

export const createSectionBlock = (
  type: TextObject["type"],
  text: string,
): SectionBlock => ({
  type: "section",
  text: {
    type,
    text,
  },
});

export const createHeaderBlock = (text: string): HeaderBlock => ({
  type: "header",
  text: {
    type: "plain_text",
    text,
    emoji: true,
  },
});

export const createHeaderSection = (text: string): KnownBlock => ({
  type: "header",
  text: {
    type: "plain_text",
    text,
  },
});

export const createButton = (
  text: string,
  actionId: string,
  value: string,
): KnownBlock => ({
  type: "actions",
  elements: [
    {
      type: "button",
      text: {
        type: "plain_text",
        text,
        emoji: true,
      },
      value: value,
      action_id: actionId,
    },
  ],
});

export const createSectionWithButton = (
  text: string,
  buttonText: string,
  buttonValue: string,
) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text,
  },
  accessory: {
    type: "button",
    text: {
      type: "plain_text",
      text: buttonText,
      emoji: true,
    },
    value: buttonValue,
    action_id: buttonValue,
  },
});

export const createRichTextBlock = (
  header: string,
  body: string,
): RichTextBlock => ({
  type: "rich_text",
  elements: [
    {
      type: "rich_text_section",
      elements: [
        {
          type: "text",
          text: header,
          style: {
            bold: true,
          },
        },
        {
          type: "text",
          text: body,
        },
      ],
    },
  ],
});
