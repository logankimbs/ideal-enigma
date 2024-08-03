import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  company_id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at!: Date;
}

// Many-to-One with company (Each user belongs to one company)
// One-to-Many with insight (Each user can submit multiple insights)
// Many-to-Many with source through user_source (Each user can use multiple sources)
