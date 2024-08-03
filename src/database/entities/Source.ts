import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";
import { User } from "./User";

@Entity("sources")
export class Source {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;

  @ManyToMany(() => Company, (company) => company.sources)
  companies!: Company[];

  @ManyToMany(() => User, (user) => user.sources)
  users!: User[];

  @OneToMany(() => Insight, (insight) => insight.source)
  insights!: Insight[];
}

// Many-to-Many with company through company_source (Each source can be used by multiple companies)
// One-to-Many with insight (Each source can have multiple insights)
// Many-to-Many with user through user_source (Each source can be used by multiple users)
