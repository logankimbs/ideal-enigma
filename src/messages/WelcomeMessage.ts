import { Block, KnownBlock } from "@slack/types";
import { OPEN_MODAL } from "../listeners/actions/open-modal";
import { createButton, createTextSection } from "../utils/blocks";
import { IMessage, Message, WelcomeMessageOptions } from "../types";

class WelcomeMessage implements IMessage {
  getMessage({ userId }: WelcomeMessageOptions): Message {
    const greeting = userId ? `Hi <@${userId}> :wave:` : "Hi there! :wave:";

    const text =
      "I'm Echo, your friendly companion for capturing and sharing insights with your team. The more we contribute the faster we can Build, Measure, and Learn. Together, we can drive growth and create something amazing.";

    const blocks: (KnownBlock | Block)[] = [
      createTextSection(greeting),
      createTextSection(text),
      createTextSection("Here are some ways to get started:"),
      createButton("🚀 Submit an Insight", OPEN_MODAL, OPEN_MODAL),
      // TODO: Route button to blog
      // createButton("🔍 Impactful Insights", "open_modal", "open_modal"),
    ];

    return { text, blocks };
  }
}

export const welcomeMessage = new WelcomeMessage();
