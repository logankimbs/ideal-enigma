import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Insight } from "./insight";
import { Timestamp } from "./timestamp";

@Entity("tags")
export class Tag extends Timestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  text: string;

  @ManyToMany(() => Insight, (insight) => insight.tags)
  insights: Insight[];
}
