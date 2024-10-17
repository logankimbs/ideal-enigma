import { Installation as SlackInstallation } from "@slack/bolt";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Timestamp } from "./timestamp";

@Entity("installations")
export class Installation extends Timestamp {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ type: "jsonb" })
  data: SlackInstallation;
}
