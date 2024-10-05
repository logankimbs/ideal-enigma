import { Installation } from "@idealgma/common";
import { Controller, Get } from "@nestjs/common";
import { InstallationService } from "./installation.service";

@Controller("installation")
export class InstallationController {
  constructor(private readonly installationService: InstallationService) {}

  @Get()
  async findAll(): Promise<Installation[]> {
    return await this.installationService.findAll();
  }
}
