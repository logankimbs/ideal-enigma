import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Insight } from "./Insight";
import { Tag } from "./Tag";

@Entity()
export class InsightTag {
  @PrimaryColumn("uuid")
  insight_id!: string;

  @PrimaryColumn("uuid")
  tag_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Insight, (insight) => insight.insightTags)
  insight!: Insight;

  @ManyToOne(() => Tag, (tag) => tag.insightTags)
  tag!: Tag;
}
