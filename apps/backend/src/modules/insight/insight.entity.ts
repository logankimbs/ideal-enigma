import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../common/classes/timestamp.entity';
import { Summary } from '../summary/summary.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity('insights')
export class Insight extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  isSummarized: boolean;

  @ManyToOne(() => User, (user) => user.insights)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.insights)
  @JoinTable({ name: 'insight_tag' })
  tags: Tag[];

  @Column({ nullable: true })
  link: string;

  @ManyToOne(() => Summary, (summary) => summary.insights, { nullable: true })
  summary?: Summary;
}
