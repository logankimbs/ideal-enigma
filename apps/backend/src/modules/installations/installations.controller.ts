import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Installation } from '../../infra/database/entities/installation.entity';
import { InstallationsService } from './installations.service';

@Controller('installations')
export class InstallationsController {
  constructor(private readonly installationService: InstallationsService) {}

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Installation> {
    return await this.installationService.findOne(params.id);
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }): Promise<void> {
    await this.installationService.delete(params.id);
  }
}
