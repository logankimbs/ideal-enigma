import { SummaryData } from '@ideal-enigma/common';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../common/classes/timestamp.entity';
import { Insight } from '../insight/insight.entity';
import { Team } from '../team/team.entity';

@Entity('summaries')
export class Summary extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // IMPORTANT!!!
  // SummaryData is a union type of all the summary versions we accept
  @Column({ type: 'jsonb' })
  data: SummaryData;

  @Column()
  startDate: Date;

  @Column()
  version: number;

  @ManyToOne(() => Team, (team) => team.summaries)
  team: Team;

  @OneToMany(() => Insight, (insight) => insight.summary)
  insights: Insight[];
}
