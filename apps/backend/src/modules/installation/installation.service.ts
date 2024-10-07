import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Installation } from "./installation.entity";

@Injectable()
export class InstallationService {
  constructor(
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
  ) {}

  findAll(): Promise<Installation[]> {
    return this.installationRepository.find();
  }
}
