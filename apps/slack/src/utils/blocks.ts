import {
  Button,
  ContextBlock,
  HeaderBlock,
  InputBlock,
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

export const createButton = (text: string, value: string): KnownBlock => ({
  type: "actions",
  elements: [
    {
      type: "button",
      text: {
        type: "plain_text",
        text,
        emoji: true,
      },
      value,
      action_id: value,
    },
  ],
});

type CreateSectionWithButtonProps = {
  text: string;
  buttonText: string;
  buttonValue: string;
  url?: string;
};

export const createSectionWithButton = (props: CreateSectionWithButtonProps) => {
  const { text, buttonText, buttonValue, url } = props;

  const accessory: Button = {
    type: "button",
    text: {
      type: "plain_text",
      text: buttonText,
      emoji: true,
    },
    value: buttonValue,
    action_id: buttonValue,
  };

  if (url) accessory.url = url;

  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text,
    },
    accessory,
  };
};

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

export const createInputBlock = (labelText: string): InputBlock => ({
  type: "input",
  block_id: "input_block_id",
  label: {
    type: "plain_text",
    text: labelText,
  },
  element: {
    type: "plain_text_input",
    action_id: "sample_input_id",
    multiline: true,
  },
});

export const createContextBlock = (text: string): ContextBlock => ({
  type: "context",
  elements: [{ type: "mrkdwn", text }],
});
