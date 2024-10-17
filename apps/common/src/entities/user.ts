import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Insight } from "./insight";
import { SlackUser } from "./slack/slack-user";
import { Team } from "./team";
import { Timestamp } from "./timestamp";

@Entity("users")
export class User extends Timestamp {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: SlackUser;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @OneToMany(() => Insight, (insight) => insight.user)
  insights?: Insight[];
}
