import { SlackTeam } from "./slack-team";
import { Timestamp } from "./timestamp";
import { User } from "./user";

export interface Team extends Timestamp {
  id: string;
  data: SlackTeam;
  users: User[];
}
