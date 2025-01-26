import { SlackTeam } from '@ideal-enigma/common';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Summary } from './summary.entity';
import { User } from './user.entity';

@Entity('teams')
export class Team extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb' })
  data: SlackTeam;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @OneToMany(() => Summary, (summary) => summary.team)
  summaries: Summary[];
}
