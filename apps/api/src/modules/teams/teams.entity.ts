import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Team } from "@slack/web-api/dist/types/response/TeamInfoResponse";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import { UserEntity } from "../users/user.entity";

export interface TeamData extends Omit<Team, "id"> {
  id: string;
}

@Entity("teams")
class TeamEntity extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: TeamData; // Modified slack team object

  @OneToMany(() => UserEntity, (user) => user.team)
  users: UserEntity[];
}

export default TeamEntity;
