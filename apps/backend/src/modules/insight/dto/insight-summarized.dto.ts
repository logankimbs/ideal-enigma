import { IsArray, IsNotEmpty } from "class-validator";
import { Insight } from "../insight.entity";

export class MarkInsightSummarizedDto {
  @IsArray()
  @IsNotEmpty()
  insights: Insight[];
}
