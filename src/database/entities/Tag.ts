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

@Entity("tags")
@Index("idx_tags_text", ["text"])
@Index("idx_tags_not_deleted", ["id"], { where: "deleted_at IS NULL" })
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  company_id!: string;

  @ManyToOne(() => Company, { onDelete: "CASCADE" })
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @Column({ type: "varchar", length: 255 })
  text!: string;

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

// CREATE TABLE tags (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     company_id UUID NOT NULL,
//     text VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     deleted_at TIMESTAMP WITH TIME ZONE,
//     CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
// );

// -- Add an index on the text column to speed up searches by text
// CREATE INDEX idx_tags_text ON tags (text);

// -- Add a partial index to exclude soft deleted records for common queries
// CREATE INDEX idx_tags_not_deleted ON tags (id) WHERE deleted_at IS NULL;

// -- Ensure updated_at is set to current timestamp whenever a row is updated
// CREATE OR REPLACE FUNCTION update_tags_updated_at()
// RETURNS TRIGGER AS $$
// BEGIN
//     NEW.updated_at = NOW();
//     RETURN NEW;
// END;
// $$ LANGUAGE 'plpgsql';

// CREATE TRIGGER update_tags_updated_at
// BEFORE UPDATE ON tags
// FOR EACH ROW
// EXECUTE FUNCTION update_tags_updated_at();

// -- Comment on the table
// COMMENT ON TABLE tags IS 'Table to store tags with references to companies';

// -- Add comments to columns for better documentation
// COMMENT ON COLUMN tags.id IS 'Primary key, unique identifier for each tag';
// COMMENT ON COLUMN tags.company_id IS 'Foreign key referencing the companies table';
// COMMENT ON COLUMN tags.text IS 'Text of the tag';
// COMMENT ON COLUMN tags.created_at IS 'Timestamp when the record was created';
// COMMENT ON COLUMN tags.updated_at IS 'Timestamp when the record was last updated';
// COMMENT ON COLUMN tags.deleted_at IS 'Timestamp when the record was soft deleted';
