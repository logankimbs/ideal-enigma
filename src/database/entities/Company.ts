import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Insight } from "./Insight";
import { Tag } from "./Tag";
import { CompanyIntegration } from "./CompanyIntegration";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  domain!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Insight, (insight) => insight.company)
  insights!: Insight[];

  @OneToMany(() => Tag, (tag) => tag.company)
  tags!: Tag[];

  @OneToMany(
    () => CompanyIntegration,
    (companyIntegration) => companyIntegration.company,
  )
  companyIntegrations!: CompanyIntegration[];
}
