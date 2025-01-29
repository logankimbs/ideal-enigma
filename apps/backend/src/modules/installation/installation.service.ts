import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Installation as SlackInstallation } from '@slack/oauth';
import { Repository } from 'typeorm';
import { Installation } from './installation.entity';

@Injectable()
export class InstallationService {
  constructor(
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>
  ) {}

  async create(installation: SlackInstallation): Promise<Installation> {
    const installationId = installation.isEnterpriseInstall
      ? installation.enterprise.id
      : installation.team.id;

    return this.installationRepository.save({
      id: installationId,
      token: installation.bot.token,
      data: installation,
    });
  }

  findAll(): Promise<Installation[]> {
    return this.installationRepository.find({
      where: { deletedAt: undefined },
    });
  }

  findOne(id: string): Promise<Installation> {
    return this.installationRepository.findOneByOrFail({ id });
  }

  exists(id: string): Promise<boolean> {
    return this.installationRepository.exists({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    // Does install exist
    await this.installationRepository.findOneOrFail({ where: { id } });
    const deletedInstallation = await this.installationRepository.softDelete(
      id
    );

    console.log(deletedInstallation);
  }
}
