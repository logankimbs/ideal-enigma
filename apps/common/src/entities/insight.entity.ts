import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag.entity";
import { TimestampEntity } from "./timestamp.entity";
import { User } from "./user.entity";

@Entity("insights")
export class Insight extends TimestampEntity {
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
  tags: Tag[];

  @Column({ nullable: true })
  link: string;
}
