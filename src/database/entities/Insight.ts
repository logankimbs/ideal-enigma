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
  Check,
} from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity("insights")
@Index("idx_insights_text", ["text"])
@Index("idx_insights_not_deleted", ["id"], { where: "deleted_at IS NULL" })
@Check(`"source" IN ('slack', 'teams')`)
export class Insight {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "uuid" })
  company_id!: string;

  @ManyToOne(() => Company, { onDelete: "CASCADE" })
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @Column({ type: "varchar", length: 255 })
  text!: string;

  @Column({ type: "varchar", length: 10 })
  source!: string;

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

// CREATE TABLE insights (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     user_id UUID NOT NULL,
//     company_id UUID NOT NULL,
//     text VARCHAR(255) NOT NULL,
//     source VARCHAR(10) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     deleted_at TIMESTAMP WITH TIME ZONE,
//     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//     CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
//     CONSTRAINT chk_source CHECK (source IN ('slack', 'teams'))
// );

// -- Add an index on the text column to speed up searches by text
// CREATE INDEX idx_insights_text ON insights (text);

// -- Add a partial index to exclude soft deleted records for common queries
// CREATE INDEX idx_insights_not_deleted ON insights (id) WHERE deleted_at IS NULL;

// -- Ensure updated_at is set to current timestamp whenever a row is updated
// CREATE OR REPLACE FUNCTION update_insights_updated_at()
// RETURNS TRIGGER AS $$
// BEGIN
//     NEW.updated_at = NOW();
//     RETURN NEW;
// END;
// $$ LANGUAGE 'plpgsql';

// CREATE TRIGGER update_insights_updated_at
// BEFORE UPDATE ON insights
// FOR EACH ROW
// EXECUTE FUNCTION update_insights_updated_at();

// -- Comment on the table
// COMMENT ON TABLE insights IS 'Table to store insights with references to users and companies';

// -- Add comments to columns for better documentation
// COMMENT ON COLUMN insights.id IS 'Primary key, unique identifier for each insight';
// COMMENT ON COLUMN insights.user_id IS 'Foreign key referencing the users table';
// COMMENT ON COLUMN insights.company_id IS 'Foreign key referencing the companies table';
// COMMENT ON COLUMN insights.text IS 'Text of the insight';
// COMMENT ON COLUMN insights.source IS 'Source of the insight';
// COMMENT ON COLUMN insights.created_at IS 'Timestamp when the record was created';
// COMMENT ON COLUMN insights.updated_at IS 'Timestamp when the record was last updated';
// COMMENT ON COLUMN insights.deleted_at IS 'Timestamp when the record was soft deleted';
