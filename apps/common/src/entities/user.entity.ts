import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SlackUser } from "../classes";
import { Insight } from "./insight.entity";
import { Team } from "./team.entity";
import { TimestampEntity } from "./timestamp.entity";

@Entity("users")
export class User extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: SlackUser;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @OneToMany(() => Insight, (insight) => insight.user)
  insights: Insight[];
}
