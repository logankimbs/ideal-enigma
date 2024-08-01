import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Integration } from "./Integration";
import { User } from "./User";

@Entity()
export class UserIntegration {
  @PrimaryColumn("uuid")
  user_id!: string;

  @PrimaryColumn("uuid")
  integration_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => User, (user) => user.userIntegrations)
  user!: User;

  @ManyToOne(() => Integration, (integration) => integration.userIntegrations)
  integration!: Integration;
}
