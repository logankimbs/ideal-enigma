import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Installation } from './installation.entity';
import { InstallationService } from './installation.service';

@Controller('installations')
export class InstallationController {
  constructor(private readonly installationService: InstallationService) {}

  @Get()
  async findAll(): Promise<Installation[]> {
    return await this.installationService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Installation> {
    return await this.installationService.findOne(params.id);
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }): Promise<void> {
    await this.installationService.delete(params.id);
  }
}
