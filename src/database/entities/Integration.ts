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

@Entity("integrations")
export class Integration {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  integration_type!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(
    () => CompanyIntegration,
    (companyIntegration) => companyIntegration.integration,
  )
  companyIntegrations!: CompanyIntegration[];

  @OneToMany(
    () => UserIntegration,
    (userIntegration) => userIntegration.integration,
  )
  userIntegrations!: UserIntegration[];
}
