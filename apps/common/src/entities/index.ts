import { Insight } from "./insight.entity";
import { Installation } from "./installation.entity";
import { Tag } from "./tag.entity";
import { Team } from "./team.entity";
import { User } from "./user.entity";

/** An array of entities for TypeORM */
export const entities = [Insight, Installation, Tag, Team, User];

export { Insight, Installation, Tag, Team, User };
