import { SlackUser } from "@ideal-enigma/common";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import { Insight } from "../insight/insight.entity";
import { Team } from "../team/team.entity";

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
