import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";
import { Source } from "./Source";
import { Tag } from "./Tag";
import { BaseEntity } from "./BaseEntity";

@Entity("insights")
export class Insight extends BaseEntity {
  @ManyToOne(() => User, (user) => user.insights)
  user!: User;

  @ManyToOne(() => Company, (company) => company.insights)
  company!: Company;

  @ManyToOne(() => Source, (source) => source.insights)
  source!: Source;

  @Column("text")
  text!: string;

  @ManyToMany(() => Tag, (tag) => tag.insights)
  @JoinTable({
    name: "insight_tags",
    joinColumn: { name: "insight_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
  })
  tags!: Tag[];
}

// Many-to-One with user (Each insight is submitted by one user)
// Many-to-One with source (Each insight is linked to one source)
// Many-to-One with company (Each insight is associated with one one company)
// Many-to-Many with tag through insight_tag (Each insight can have multiple tags)
