import { SlackUser } from '@ideal-enigma/common';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Insight } from './insight.entity';
import { Team } from './team.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb' })
  data: SlackUser;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @OneToMany(() => Insight, (insight) => insight.user)
  insights: Insight[];

  // Used for tracking onboarding completion
  @Column({ type: 'timestamp', nullable: true })
  onboardCompletedAt: Date | null; // Null if not completed, Date if completed

  @Column({ type: 'boolean', default: false })
  notifications: boolean;
}
