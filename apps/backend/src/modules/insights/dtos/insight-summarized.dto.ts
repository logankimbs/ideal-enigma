import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Insight } from '../../../infra/database/entities/insight.entity';
import { Summary } from '../../../infra/database/entities/summary.entity';

export class MarkInsightSummarizedDto {
  @IsArray()
  @IsNotEmpty()
  insights: Insight[];

  @IsObject()
  @IsNotEmptyObject()
  summary: Summary;
}
