import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Insight } from './insight.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  text: string;

  @ManyToMany(() => Insight, (insight) => insight.tags)
  insights: Insight[];
}
