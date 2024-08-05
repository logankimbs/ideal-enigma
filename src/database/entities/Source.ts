import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity("sources")
export class Source extends BaseEntity {
  @Column()
  name!: string;

  @ManyToMany(() => Company, (company) => company.sources)
  companies!: Company[];

  @ManyToMany(() => User, (user) => user.sources)
  users!: User[];

  @OneToMany(() => Insight, (insight) => insight.source)
  insights!: Insight[];
}
