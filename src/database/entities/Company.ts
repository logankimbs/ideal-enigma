import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity("companies")
@Index("idx_companies_name", ["name"])
@Index("idx_companies_domain", ["domain"])
@Index("idx_companies_not_deleted", ["id"], { where: "deleted_at IS NULL" })
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  domain!: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @Column({ type: "timestamptz", nullable: true })
  deleted_at!: Date | null;

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }
}

// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

// -- Create companies table
// CREATE TABLE companies (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     name VARCHAR(255) NOT NULL,
//     domain VARCHAR(255) UNIQUE,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     deleted_at TIMESTAMP WITH TIME ZONE
// );

// -- Add an index on the name column to speed up searches by name
// CREATE INDEX idx_companies_name ON companies (name);

// -- Add a partial index to exclude soft deleted records for common queries
// CREATE INDEX idx_companies_not_deleted ON companies (id) WHERE deleted_at IS NULL;

// -- Ensure updated_at is set to current timestamp whenever a row is updated
// CREATE OR REPLACE FUNCTION update_updated_at_column()
// RETURNS TRIGGER AS $$
// BEGIN
//     NEW.updated_at = NOW();
//     RETURN NEW;
// END;
// $$ LANGUAGE 'plpgsql';

// CREATE TRIGGER update_companies_updated_at
// BEFORE UPDATE ON companies
// FOR EACH ROW
// EXECUTE FUNCTION update_updated_at_column();

// -- Comment on the table
// COMMENT ON TABLE companies IS 'Table to store information about companies';

// -- Add comments to columns for better documentation
// COMMENT ON COLUMN companies.id IS 'Primary key, unique identifier for each company';
// COMMENT ON COLUMN companies.name IS 'Name of the company';
// COMMENT ON COLUMN companies.domain IS 'Domain of the company';
// COMMENT ON COLUMN companies.created_at IS 'Timestamp when the record was created';
// COMMENT ON COLUMN companies.updated_at IS 'Timestamp when the record was last updated';
// COMMENT ON COLUMN companies.deleted_at IS 'Timestamp when the record was soft deleted';
