import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { TimestampEntity } from "./TimestampEntity";
import InsightEntity from "./InsightEntity";

@Entity("tag")
class TagEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @ManyToMany(() => InsightEntity, (insight) => insight.tags)
  insights: InsightEntity[];
}

export default TagEntity;
