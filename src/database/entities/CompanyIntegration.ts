import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Company } from "./Company";
import { Integration } from "./Integration";

@Entity("company_integrations")
export class CompanyIntegration {
  @PrimaryColumn("uuid")
  company_id!: string;

  @PrimaryColumn("uuid")
  integration_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  // @ManyToOne(() => Company, (company) => company.companyIntegrations)
  // company!: Company;

  // @ManyToOne(
  //   () => Integration,
  //   (integration) => integration.companyIntegrations,
  // )
  // integration!: Integration;
}
