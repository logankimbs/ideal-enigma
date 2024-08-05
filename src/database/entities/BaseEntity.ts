import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deletedAt!: Date;
}
