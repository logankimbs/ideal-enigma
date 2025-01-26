import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../infra/database/entities/team.entity';
import { User } from '../../infra/database/entities/user.entity';
import { InsightsModule } from '../insights/insights.module';
import { TagsModule } from '../tags/tags.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Team]), TagsModule, InsightsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
