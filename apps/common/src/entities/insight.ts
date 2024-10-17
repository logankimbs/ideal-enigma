import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag";
import { Timestamp } from "./timestamp";
import { User } from "./user";

@Entity("insights")
export class Insight extends Timestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  isSummarized: boolean;

  @ManyToOne(() => User, (user) => user.insights)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.insights)
  @JoinTable({ name: "insight_tag" })
  tags?: Tag[];

  @Column({ nullable: true })
  link?: string;
}
