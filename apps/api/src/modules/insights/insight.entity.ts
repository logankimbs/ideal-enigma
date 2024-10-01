import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { UserEntity } from "../users/user.entity";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import TagEntity from "../tags/tags.entity";

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
