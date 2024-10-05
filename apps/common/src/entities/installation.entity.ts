import { Installation as SlackInstallation } from "@slack/bolt";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "./timestamp.entity";

@Entity("installations")
export class Installation extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ type: "jsonb" })
  data: SlackInstallation;
}
