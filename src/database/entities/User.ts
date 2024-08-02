import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  BeforeUpdate,
} from "typeorm";
import { Company } from "./Company";

@Entity("users")
@Index("idx_users_name", ["name"])
@Index("idx_users_email", ["email"])
@Index("idx_users_not_deleted", ["id"], { where: "deleted_at IS NULL" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  company_id!: string;

  @ManyToOne(() => Company, (company) => company.users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @Column({ type: "timestamptz", nullable: true })
  deleted_at!: Date | null;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }
}

// CREATE TABLE users (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   company_id UUID NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   is_active BOOLEAN DEFAULT TRUE NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//   deleted_at TIMESTAMP WITH TIME ZONE,
//   CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
// );

// -- Add an index on the name column to speed up searches by name
// CREATE INDEX idx_users_name ON users (name);

// -- Add an index on the email column to speed up searches by email
// CREATE INDEX idx_users_email ON users (email);

// -- Add a partial index to exclude soft deleted records for common queries
// CREATE INDEX idx_users_not_deleted ON users (id) WHERE deleted_at IS NULL;

// -- Ensure updated_at is set to current timestamp whenever a row is updated
// CREATE OR REPLACE FUNCTION update_users_updated_at()
// RETURNS TRIGGER AS $$
// BEGIN
//   NEW.updated_at = NOW();
//   RETURN NEW;
// END;
// $$ LANGUAGE 'plpgsql';

// CREATE TRIGGER update_users_updated_at
// BEFORE UPDATE ON users
// FOR EACH ROW
// EXECUTE FUNCTION update_users_updated_at();

// -- Comment on the table
// COMMENT ON TABLE users IS 'Table to store information about users';

// -- Add comments to columns for better documentation
// COMMENT ON COLUMN users.id IS 'Primary key, unique identifier for each user';
// COMMENT ON COLUMN users.company_id IS 'Foreign key referencing the companies table';
// COMMENT ON COLUMN users.name IS 'Name of the user';
// COMMENT ON COLUMN users.email IS 'Email of the user';
// COMMENT ON COLUMN users.is_active IS 'Indicates if the user is active';
// COMMENT ON COLUMN users.created_at IS 'Timestamp when the record was created';
// COMMENT ON COLUMN users.updated_at IS 'Timestamp when the record was last updated';
// COMMENT ON COLUMN users.deleted_at IS 'Timestamp when the record was soft deleted';
