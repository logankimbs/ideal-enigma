import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import UserEntity from "./UserEntity";
import { TimestampEntity } from "./TimestampEntity";
import TagEntity from "./TagEntity";

@Entity("insight")
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
}

export default InsightEntity;
