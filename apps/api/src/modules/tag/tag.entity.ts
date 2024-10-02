import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import InsightEntity from "../insights/insight.entity";
import { TimestampEntity } from "../../common/classes/timestamp.entity";

@Entity("tags")
export class Tag extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @ManyToMany(() => InsightEntity, (insight) => insight.tags)
  @JoinTable({ name: "insight_tag" })
  insights: InsightEntity[];
}
