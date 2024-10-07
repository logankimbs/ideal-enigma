import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TimestampEntity } from "../../common/classes/timestamp.entity";
import { Insight } from "../insight/insight.entity";

@Entity("tags")
export class Tag extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @ManyToMany(() => Insight, (insight) => insight.tags)
  @JoinTable({ name: "insight_tag" })
  insights: Insight[];
}
