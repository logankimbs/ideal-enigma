import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Insight } from "./insight.entity";
import { Source } from "./source.entity";
import { Tag } from "./tag.entity";
import { BaseEntity } from "./base.entity";

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
