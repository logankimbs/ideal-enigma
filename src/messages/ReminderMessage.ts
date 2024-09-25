import { KnownBlock, Block } from "@slack/types";
import { OPEN_INSIGHT_MODAL } from "../constants";
import { createButton, createTextSection } from "../utils/blocks";
import {
  IMessage,
  Message,
  MessageDay,
  MessageText,
  ReminderMessageOptions,
} from "../types";

class ReminderMessage implements IMessage {
  public getMessage({ day }: ReminderMessageOptions): Message {
    const { greeting, body, actionHeader } = this.getText(day);

    const blocks: (KnownBlock | Block)[] = [
      createTextSection(greeting),
      createTextSection(body),
      ...(actionHeader ? [createTextSection(actionHeader)] : []),
      createButton("🚀 Submit an Insight", OPEN_INSIGHT_MODAL),
      // TODO: Route button to blog
      // createButton("🔍 Impactful Insights", "open_modal", "open_modal"),
    ];

    return { text: body, blocks };
  }

  private getText(day: MessageDay): MessageText {
    switch (day) {
      case "Monday":
        return {
          greeting: "Happy Monday!",
          body: "We almost have enough insights to give you a Weekly/Monthly digested summary. Remember to submit your insight(s) this week!",
        };

      case "Wednesday":
        return {
          greeting: "Hey there, it's Wednesday! 🐪",
          body: "Your week's halfway through, which means your insights might be shaping up nicely—just a little nudge to keep them in mind. Keep going, you’re doing great!",
        };

      case "Friday":
        return {
          greeting: "Happy Friday! 🎉",
          body: "Time to wrap up the week and share those brilliant insights you’ve gathered. Don’t be shy—hit that submit button and let your team in on the good stuff. Let’s end the week on a high note!",
        };

      default:
        return {
          greeting: "",
          body: "",
        };
    }
  }
}

export const reminderMessage = new ReminderMessage();
