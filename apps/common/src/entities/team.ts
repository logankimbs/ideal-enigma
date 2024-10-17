import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { SlackTeam } from "./slack/slack-team";
import { Timestamp } from "./timestamp";
import { User } from "./user";

@Entity("teams")
export class Team extends Timestamp {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: SlackTeam;

  @OneToMany(() => User, (user) => user.team)
  users: User[];
}
