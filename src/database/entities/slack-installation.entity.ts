import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Installation } from "@slack/bolt";

@Entity("slack_installations")
export class SlackInstallation extends BaseEntity {
  @Column({ nullable: true })
  team_id?: string;

  @Column({ nullable: true })
  enterprise_id?: string;

  @Column("simple-json")
  installation: Installation;
}
