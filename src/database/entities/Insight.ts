import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("insights")
export class Insight {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  company_id!: string;

  @Column()
  source_id!: string;

  @Column()
  text!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;
}

// Many-to-One with user (Each insight is submitted by one user)
// Many-to-One with source (Each insight is linked to one source)
// Many-to-One with company (Each insight is associated with one one company)
// Many-to-Many with tag through insight_tag (Each insight can have multiple tags)
