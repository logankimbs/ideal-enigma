import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";
import { Source } from "./Source";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("insights")
export class Insight {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  company_id!: string;

  @Column()
  source_id!: string;

  @Column()
  text!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;

  @ManyToOne(() => User, (user) => user.insights)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Company, (company) => company.insights)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @ManyToOne(() => Source, (source) => source.insights)
  @JoinColumn({ name: "source_id" })
  source!: Source;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: "insight_tags",
    joinColumn: { name: "insight_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
  })
  tags!: Tag[];
}
