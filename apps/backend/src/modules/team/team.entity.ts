import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from '../../common/classes/timestamp.entity';
import { User } from '../user/user.entity';
import { SlackTeam } from '@ideal-enigma/common';
import { Summary } from '../summary/summary.entity';

@Entity('teams')
export class Team extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb' })
  data: SlackTeam;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @OneToMany(() => Summary, (summary) => summary.team)
  summaries: Summary[];
}
