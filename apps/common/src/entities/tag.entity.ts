import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Insight } from "./insight.entity";
import { TimestampEntity } from "./timestamp.entity";

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
