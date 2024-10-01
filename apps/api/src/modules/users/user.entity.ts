import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import InsightEntity from "../insights/insight.entity";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import { User } from "@slack/web-api/dist/types/response/UsersInfoResponse";
import TeamEntity from "../teams/teams.entity";

export interface UserData extends Omit<User, "id" | "team_id"> {
  id: string;
  team_id: string;
}

@Entity("users")
export class UserEntity extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: UserData; // Modified slack user object

  @ManyToOne(() => TeamEntity, (team) => team.users)
  team: TeamEntity;

  @OneToMany(() => InsightEntity, (insight) => insight.user)
  insights: InsightEntity[];
}
