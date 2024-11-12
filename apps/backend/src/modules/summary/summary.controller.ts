import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { Summary } from './summary.entity';
import { SummaryService } from './summary.service';

@Controller('summaries')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async create(@Body() createSummaryDto: CreateSummaryDto): Promise<Summary> {
    return await this.summaryService.create(createSummaryDto);
  }

  @Get(':id')
  async getSummaryById(@Param('id') id: string) {
    return this.summaryService.findById(id);
  }

  @Get('team/:teamId')
  async getSummarriesByTeamId(@Param('teamId') teamId: string) {
    return this.summaryService.findByTeamId(teamId);
  }
}
