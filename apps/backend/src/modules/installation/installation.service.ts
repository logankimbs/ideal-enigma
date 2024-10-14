import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateInstallationDto } from "./dto/create-installation.dto";
import { Installation } from "./installation.entity";

@Injectable()
export class InstallationService {
  constructor(
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
  ) {}

  async create(
    createInstallationDto: CreateInstallationDto,
  ): Promise<Installation> {
    const installation = new Installation();
    installation.id = createInstallationDto.id;
    installation.token = createInstallationDto.token;
    installation.data = createInstallationDto.installation;

    return this.installationRepository.save(installation);
  }

  findAll(): Promise<Installation[]> {
    return this.installationRepository.find({
      where: { deletedAt: undefined },
    });
  }

  findOne(id: string): Promise<Installation> {
    return this.installationRepository.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    // Does install exist
    await this.installationRepository.findOneOrFail({ where: { id } });
    await this.installationRepository.softDelete(id);
  }
}
