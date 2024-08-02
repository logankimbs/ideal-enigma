import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { CompanyIntegration } from "./CompanyIntegration";
import { UserIntegration } from "./UserIntegration";

export enum IntegrationPlatform {
  SLACK = "slack",
}

@Entity("integrations")
export class Integration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: IntegrationPlatform,
    default: IntegrationPlatform.SLACK,
  })
  platform!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  // @OneToMany(
  //   () => CompanyIntegration,
  //   (companyIntegration) => companyIntegration.integration,
  // )
  // companyIntegrations!: CompanyIntegration[];

  // @OneToMany(
  //   () => UserIntegration,
  //   (userIntegration) => userIntegration.integration,
  // )
  // userIntegrations!: UserIntegration[];
}
