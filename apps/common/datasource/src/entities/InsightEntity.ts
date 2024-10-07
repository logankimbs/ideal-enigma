import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TagEntity from "./TagEntity";
import { TimestampEntity } from "./TimestampEntity";
import UserEntity from "./UserEntity";

@Entity("insights")
class InsightEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  isSummarized: boolean;

  @ManyToOne(() => UserEntity, (user) => user.insights)
  user: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.insights)
  @JoinTable({ name: "insight_tag" })
  tags: TagEntity[];

  @Column({ nullable: true })
  link: string;
}

export default InsightEntity;
