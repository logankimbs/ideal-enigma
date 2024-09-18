import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { TimestampEntity } from "./TimestampEntity";
import { TeamData } from "../types";

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
