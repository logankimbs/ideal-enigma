import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Insight } from '../../../domain/entities/insight.entity';
import { Summary } from '../../../domain/entities/summary.entity';

export class MarkInsightSummarizedDto {
  @IsArray()
  @IsNotEmpty()
  insights: Insight[];

  @IsObject()
  @IsNotEmptyObject()
  summary: Summary;
}
