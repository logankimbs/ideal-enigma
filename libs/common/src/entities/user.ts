import { Insight } from './insight';
import { SlackUser } from './slack/slack-user';
import { Team } from './team';
import { Timestamp } from './timestamp';

export interface User extends Timestamp {
  id: string;
  data: SlackUser;
  team: Team;
  insights?: Insight[];
}
