import { Team as SlackTeam } from "@slack/web-api/dist/types/response/TeamInfoResponse";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "./timestamp.entity";
import { User } from "./user.entity";

interface TeamData extends Omit<SlackTeam, "id"> {
  id: string;
}

@Entity("teams")
export class Team extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "jsonb" })
  data: TeamData; // Modified slack team object

  @OneToMany(() => User, (user) => user.team)
  users: User[];
}
