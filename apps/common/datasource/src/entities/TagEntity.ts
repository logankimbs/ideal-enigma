import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import InsightEntity from "./InsightEntity";
import { TimestampEntity } from "./TimestampEntity";

@Entity("tags")
class TagEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @ManyToMany(() => InsightEntity, (insight) => insight.tags)
  @JoinTable({ name: "insight_tag" })
  insights: InsightEntity[];
}

export default TagEntity;
