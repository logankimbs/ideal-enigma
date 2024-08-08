import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

type Team = {
  id: string;
  name: string;
};

type Enterprise = {
  id: string;
  name: string;
};

type User = {
  token: string | undefined;
  scopes: string[] | undefined;
  id: string;
};

type Bot = {
  scopes: string[];
  token: string;
  user_id: string;
  id: string;
};

@Entity("slack_installations")
export class SlackInstallation extends BaseEntity {
  @Column("simple-json", { nullable: true })
  team!: Team | undefined;

  @Column("simple-json", { nullable: true })
  enterprise!: Enterprise | undefined;

  @Column("simple-json")
  user!: User;

  @Column()
  token_type!: string;

  @Column()
  is_enterprise_install!: boolean;

  @Column()
  app_id!: string;

  @Column()
  auth_version!: string;

  @Column("simple-json")
  bot!: Bot;

  @Column()
  enterprise_url!: string;
}
