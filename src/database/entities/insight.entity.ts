import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Company } from "./company.entity";
import { Source } from "./source.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity("insights")
export class Insight extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.insights)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Company, (company) => company.insights)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @ManyToOne(() => Source, (source) => source.insights)
  @JoinColumn({ name: "source_id" })
  source: Source;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: "insight_tags",
    joinColumn: { name: "insight_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
  })
  tags: Tag[];
}
