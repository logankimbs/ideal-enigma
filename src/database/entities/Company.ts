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
import { BaseEntity } from "./BaseEntity";

@Entity("companies")
export class Company extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  domain!: string;

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
