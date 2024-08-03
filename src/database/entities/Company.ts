import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Insight } from "./Insight";
import { Source } from "./Source";
import { Tag } from "./Tag";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  domain!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;

  @ManyToMany(() => Source, (source) => source.companies)
  @JoinTable({
    name: "company_sources",
    joinColumn: { name: "company_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "source_id", referencedColumnName: "id" },
  })
  sources!: Source[];

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Insight, (insight) => insight.company)
  insights!: Insight[];

  @OneToMany(() => Tag, (tag) => tag.company)
  tags!: Tag[];
}
