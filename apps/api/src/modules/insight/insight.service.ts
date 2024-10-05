import { Insight } from "@idealgma/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class InsightService {
  constructor(
    @InjectRepository(Insight)
    private insightRepository: Repository<Insight>,
  ) {}

  findAll(): Promise<Insight[]> {
    return this.insightRepository.find();
  }
}
