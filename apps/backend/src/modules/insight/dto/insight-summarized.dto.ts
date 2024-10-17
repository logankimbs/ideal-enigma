import { Insight } from "@idealgma/common";
import { IsArray, IsNotEmpty } from "class-validator";

export class MarkInsightSummarized {
  @IsArray()
  @IsNotEmpty()
  insights: Insight[];
}
