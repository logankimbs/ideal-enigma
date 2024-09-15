import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./UserEntity";
import { TimestampEntity } from "./TimestampEntity";

@Entity("insights")
export class InsightEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  isSummarized: boolean;

  @ManyToOne(() => UserEntity, (user) => user.insights)
  user: UserEntity;
}
