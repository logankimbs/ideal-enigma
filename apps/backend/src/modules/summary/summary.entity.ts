import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../common/classes/timestamp.entity';
import { Team } from '../team/team.entity';

@Entity('summaries')
export class Summary extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Team, (team) => team.summaries)
  team: Team;
}
