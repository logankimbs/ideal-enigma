import { Installation as SlackInstallation } from "@slack/bolt";
import { Timestamp } from "./timestamp";

export interface Installation extends Timestamp {
  id: string;
  token: string;
  data: SlackInstallation;
}
