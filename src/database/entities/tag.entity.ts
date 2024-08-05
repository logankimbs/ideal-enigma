import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Company } from "./company.entity";
import { Insight } from "./insight.entity";
import { BaseEntity } from "./base.entity";

@Entity("tags")
export class Tag extends BaseEntity {
  @Column()
  text!: string;

  @ManyToOne(() => Company, (company) => company.tags)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @ManyToMany(() => Insight, (insight) => insight.tags)
  insights!: Insight[];
}
