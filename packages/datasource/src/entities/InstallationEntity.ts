import { Installation } from "@slack/bolt";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "./TimestampEntity";

@Entity("installations")
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
