import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";
import { BaseEntity } from "./BaseEntity";

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
