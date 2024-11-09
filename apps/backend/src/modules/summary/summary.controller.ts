import { Controller } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summaries')
export class SummaryController {
  constructor(private readonly SummaryService: SummaryService) {}
}
