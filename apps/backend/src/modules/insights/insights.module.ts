import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insight } from '../../domain/entities/insight.entity';
import { Tag } from '../../domain/entities/tag.entity';
import { User } from '../../domain/entities/user.entity';
import { InstallationsModule } from '../installations/installations.module';
import { TeamsModule } from '../teams/teams.module';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';

@Module({
  imports: [
    forwardRef(() => TeamsModule),
    TypeOrmModule.forFeature([Insight, User, Tag]),
    InstallationsModule,
  ],
  controllers: [InsightsController],
  providers: [InsightsService],
  exports: [InsightsService],
})
export class InsightsModule {}
