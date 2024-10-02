import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../user/user.entity";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import { Tag } from "../tag/tag.entity";

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
