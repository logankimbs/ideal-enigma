import { Installation as SlackInstallation } from "@slack/bolt";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "../../common/classes/timestamp.entity";

@Entity("installations")
export class Installation extends TimestampEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ type: "jsonb" })
  data: SlackInstallation;

  // TODO: Remove this crap
  static createInstallationEntity(
    installation: SlackInstallation,
    id: string,
  ): Installation {
    const installationEntity = new Installation();

    installationEntity.id = id;
    installationEntity.token = installation.bot?.token ?? "";
    installationEntity.data = installation;

    return installationEntity;
  }
}
