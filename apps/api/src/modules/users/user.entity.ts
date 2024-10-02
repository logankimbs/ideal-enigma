import { User as SlackUser } from "@slack/web-api/dist/types/response/UsersInfoResponse";
import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import InsightEntity from "../insights/insight.entity";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import { Team } from "../team/team.entity";

interface UserData extends Omit<SlackUser, "id" | "team_id"> {
  id: string;
  team_id: string;
}

@Entity("users")
export class User extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: UserData; // Modified slack user object

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @OneToMany(() => InsightEntity, (insight) => insight.user)
  insights: InsightEntity[];
}
