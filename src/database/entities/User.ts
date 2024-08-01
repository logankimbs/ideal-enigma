import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";
import { UserIntegration } from "./UserIntegration";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Company, (company) => company.users)
  company!: Company;

  @OneToMany(() => Insight, (insight) => insight.user)
  insights!: Insight[];

  @OneToMany(() => UserIntegration, (userIntegration) => userIntegration.user)
  userIntegrations!: UserIntegration[];
}
