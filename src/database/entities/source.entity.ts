import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Company } from "./company.entity";
import { Insight } from "./insight.entity";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity("sources")
export class Source extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Company, (company) => company.sources)
  companies: Company[];

  @ManyToMany(() => User, (user) => user.sources)
  users: User[];

  @OneToMany(() => Insight, (insight) => insight.source)
  insights: Insight[];
}
