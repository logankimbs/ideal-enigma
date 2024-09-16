import { HeaderBlock, KnownBlock, SectionBlock, TextObject } from "@slack/types"

export const createTextSection = (text: string): KnownBlock => ({
    type: "section",
    text: {
        type: "mrkdwn",
        text,
    },
})

export const createSectionBlock = (
    type: TextObject["type"],
    text: string,
): SectionBlock => ({
    type: "section",
    text: {
        type,
        text,
    },
})

export const createHeaderBlock = (text: string): HeaderBlock => ({
    type: "header",
    text: {
        type: "plain_text",
        text,
        emoji: true,
    },
})

export const createHeaderSection = (text: string): KnownBlock => ({
    type: "header",
    text: {
        type: "plain_text",
        text,
    },
})

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
})
