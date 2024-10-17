import { Insight } from "./insight";
import { Installation } from "./installation";
import { Tag } from "./tag";
import { Team } from "./team";
import { User } from "./user";

export * from "./insight";
export * from "./installation";
export * from "./slack/slack-team";
export * from "./slack/slack-user";
export * from "./tag";
export * from "./team";
export * from "./user";

export const entities = [Insight, Installation, Tag, Team, User];
