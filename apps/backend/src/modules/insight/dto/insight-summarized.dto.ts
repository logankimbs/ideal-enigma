import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Summary } from '../../summary/summary.entity';
import { Insight } from '../insight.entity';

export class MarkInsightSummarizedDto {
  @IsArray()
  @IsNotEmpty()
  insights: Insight[];

  @IsObject()
  @IsNotEmptyObject()
  summary: Summary;
}
