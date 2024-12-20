import { SummaryData } from '@ideal-enigma/common';
import { ExpressReceiverOptions } from '@slack/bolt';
import { Block, KnownBlock } from '@slack/types';
import { Team } from '@slack/web-api/dist/types/response/TeamInfoResponse';
import { User } from '@slack/web-api/dist/types/response/UsersInfoResponse';
import { ClientOptions } from 'openai';

export interface TeamData extends Omit<Team, 'id'> {
  id: string;
}

export interface UserData extends Omit<User, 'id' | 'team_id'> {
  id: string;
  team_id: string;
}

export type SlackID = 'User' | 'Team' | 'Enterprise' | 'Bot' | 'App';

export type SlackApiMethod =
  | 'users.info'
  | 'users.list'
  | 'team.info'
  | 'chat.postMessage'
  | 'chat.scheduleMessage';

/*****************/
/* MESSAGE TYPES */
/*****************/
export type Message = {
  text: string;
  blocks: (KnownBlock | Block)[];
};

export type MessageText = {
  greeting: string;
  body: string;
  actionHeader?: string;
};

export type MessageDay = 'Monday' | 'Wednesday' | 'Friday';

export type WelcomeMessageOptions = {
  userId?: string;
};

export type ReminderMessageOptions = {
  day: MessageDay;
};

export type SummaryMessageOptions = {
  summary: SummaryData;
  count: number;
};

export type MessageOptions =
  | WelcomeMessageOptions
  | ReminderMessageOptions
  | SummaryMessageOptions;

export type MessageType = 'reminder' | 'welcome' | 'summary';

export interface IMessage {
  getMessage(options: MessageOptions): Message;
}

export type Config = {
  apiUrl: string;
  nodeEnv: string;
  isDev: boolean;
  port: string;
  secretKey: string;
  receiver: ExpressReceiverOptions;
  openAI: ClientOptions;
};
