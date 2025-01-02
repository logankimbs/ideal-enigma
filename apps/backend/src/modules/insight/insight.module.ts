import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallationModule } from '../installation/installation.module';
import { Tag } from '../tag/tag.entity';
import { TeamModule } from '../team/team.module';
import { User } from '../user/user.entity';
import { InsightController } from './insight.controller';
import { Insight } from './insight.entity';
import { InsightService } from './insight.service';

@Module({
  imports: [
    forwardRef(() => TeamModule),
    TypeOrmModule.forFeature([Insight, User, Tag]),
    InstallationModule,
  ],
  controllers: [InsightController],
  providers: [InsightService],
  exports: [InsightService],
})
export class InsightModule {}
