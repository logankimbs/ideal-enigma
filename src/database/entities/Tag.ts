import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  text!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;

  @ManyToOne(() => Company, (company) => company.tags)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @ManyToMany(() => Insight, (insight) => insight.tags)
  insights!: Insight[];
}

// Many-to-One with company (Each tag belongs to one company)
// Many-to-Many with insight though insight_tag (Each tag can be used by multiple insights)
