import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";
import { Source } from "./Source";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @ManyToMany(() => Source, (source) => source.users)
  @JoinTable({
    name: "user_sources",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "source_id", referencedColumnName: "id" },
  })
  sources!: Source[];

  @OneToMany(() => Insight, (insight) => insight.user)
  insights!: Insight[];
}
