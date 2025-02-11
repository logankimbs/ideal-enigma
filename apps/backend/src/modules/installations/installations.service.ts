import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Installation as SlackInstallation } from '@slack/oauth';
import { IsNull, Repository } from 'typeorm';
import { Installation } from '../../infra/database/entities/installation.entity';

@Injectable()
export class InstallationsService {
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

  async getAllInstallations(): Promise<Installation[]> {
    return await this.installationRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: string): Promise<Installation> {
    return await this.installationRepository.findOneByOrFail({ id });
  }

  async exists(id: string): Promise<boolean> {
    return await this.installationRepository.exists({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.installationRepository.findOneOrFail({ where: { id } });
    await this.installationRepository.softDelete(id);
  }

  static toMap(installations: Installation[]): Map<string, Installation> {
    return installations.reduce((map, installation) => {
      map.set(installation.id, installation);
      return map;
    }, new Map<string, Installation>());
  }
}
