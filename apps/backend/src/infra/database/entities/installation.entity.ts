import { Installation as SlackInstallation } from '@slack/bolt';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('installations')
export class Installation extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ type: 'jsonb' })
  data: SlackInstallation;
}
