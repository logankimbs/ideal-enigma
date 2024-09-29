import { User } from "@slack/web-api/dist/types/response/UsersInfoResponse";
import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import TeamEntity from "./TeamEntity";
import InsightEntity from "./InsightEntity";
import { TimestampEntity } from "./TimestampEntity";

interface UserData extends Omit<User, "id" | "team_id"> {
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
