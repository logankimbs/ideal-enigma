import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Insight } from "./insight.entity";

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
