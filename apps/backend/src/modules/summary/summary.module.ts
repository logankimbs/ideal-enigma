import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryController } from './summary.controller';
import { Summary } from './summary.entity';
import { SummaryService } from './summary.service';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [TeamModule, TypeOrmModule.forFeature([Summary])],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
