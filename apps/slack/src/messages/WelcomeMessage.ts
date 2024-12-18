import { Block, KnownBlock } from '@slack/types';
import { OPEN_INSIGHT_MODAL } from '../constants';
import { IMessage, Message, WelcomeMessageOptions } from '../types';
import { createButton, createTextSection } from '../utils/blocks';

class WelcomeMessage implements IMessage {
  getMessage({ userId }: WelcomeMessageOptions): Message {
    const greeting = userId ? `Hi <@${userId}> :wave:` : 'Hi there! :wave:';

    const text =
      "I'm Loop, your friendly companion for capturing and sharing insights with your team. The more we contribute the faster we can Build, Measure, and Learn. Together, we can drive growth and create something amazing.";

    const blocks: (KnownBlock | Block)[] = [
      createTextSection(greeting),
      createTextSection(text),
      createTextSection('Here are some ways to get started:'),
      createButton('🚀 Submit an Insight', OPEN_INSIGHT_MODAL),
      // TODO: Route button to blog
      // createButton("🔍 Impactful Insights", "open_modal", "open_modal"),
    ];

    return { text, blocks };
  }
}

export const welcomeMessage = new WelcomeMessage();
