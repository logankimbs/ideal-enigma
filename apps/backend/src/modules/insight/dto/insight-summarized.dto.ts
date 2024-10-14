import { IsArray, IsNotEmpty } from "class-validator";
import { Insight } from "../insight.entity";

export class MarkInsightSummarized {
  @IsArray()
  @IsNotEmpty()
  insights: Insight[];
}
