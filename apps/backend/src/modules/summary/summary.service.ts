import { Injectable } from '@nestjs/common';
import { Summary } from './summary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary)
    private summaryRepository: Repository<Summary>
  ) {}
}
