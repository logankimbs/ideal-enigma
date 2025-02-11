import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insight } from '../../infra/database/entities/insight.entity';
import { User } from '../../infra/database/entities/user.entity';
import { InstallationsModule } from '../installations/installations.module';
import { TagsModule } from '../tags/tags.module';
import { TeamsModule } from '../teams/teams.module';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Insight, User]),
    forwardRef(() => TeamsModule),
    InstallationsModule,
    TagsModule,
  ],
  controllers: [InsightsController],
  providers: [InsightsService],
  exports: [InsightsService],
})
export class InsightsModule {}
