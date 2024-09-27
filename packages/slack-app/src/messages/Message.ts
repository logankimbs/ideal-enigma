import {
  Message,
  ReminderMessageOptions,
  SummaryMessageOptions,
  WelcomeMessageOptions,
} from "../types";
import { reminderMessage } from "./ReminderMessage";
import { summaryMessage } from "./SummaryMessage";
import { welcomeMessage } from "./WelcomeMessage";

class MessageFactory {
  public getWelcomeMessage(options: WelcomeMessageOptions): Message {
    return welcomeMessage.getMessage(options);
  }

  public getReminderMessage({ day }: ReminderMessageOptions): Message {
    return reminderMessage.getMessage({ day });
  }

  public getSummaryMessage(options: SummaryMessageOptions): Message {
    return summaryMessage.getMessage(options);
  }
}

export const message = new MessageFactory();
