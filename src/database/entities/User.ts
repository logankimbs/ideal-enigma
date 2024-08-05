import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company";
import { Insight } from "./Insight";
import { Source } from "./Source";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  is_active!: boolean;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @ManyToMany(() => Source, (source) => source.users)
  @JoinTable({
    name: "user_sources",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "source_id", referencedColumnName: "id" },
  })
  sources!: Source[];

  @OneToMany(() => Insight, (insight) => insight.user)
  insights!: Insight[];
}
