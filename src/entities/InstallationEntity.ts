import { Installation } from "@slack/bolt";
import { Entity, PrimaryColumn, Column } from "typeorm";
import { TimestampEntity } from "./TimestampEntity";

@Entity("installation")
class InstallationEntity extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ type: "jsonb" })
  data: Installation;

  // TODO: Remove this crap
  static createInstallationEntity(
    installation: Installation,
    id: string,
  ): InstallationEntity {
    const installationEntity = new InstallationEntity();

    installationEntity.id = id;
    installationEntity.token = installation.bot?.token ?? "";
    installationEntity.data = installation;

    return installationEntity;
  }
}

export default InstallationEntity;
