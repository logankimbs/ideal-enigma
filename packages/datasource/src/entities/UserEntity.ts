import { User } from "@slack/web-api/dist/types/response/UsersInfoResponse";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import InsightEntity from "./InsightEntity";
import TeamEntity from "./TeamEntity";
import { TimestampEntity } from "./TimestampEntity";

export interface UserData extends Omit<User, "id" | "team_id"> {
  id: string;
  team_id: string;
}

@Entity("users")
class UserEntity extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: UserData; // Modified slack user object

  @ManyToOne(() => TeamEntity, (team) => team.users)
  team: TeamEntity;

  @OneToMany(() => InsightEntity, (insight) => insight.user)
  insights: InsightEntity[];
}

export default UserEntity;
