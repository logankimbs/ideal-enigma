import { Controller, Get } from "@nestjs/common";
import { Installation } from "./installation.entity";
import { InstallationService } from "./installation.service";

@Controller("installation")
export class InstallationController {
  constructor(private readonly installationService: InstallationService) {}

  @Get()
  async findAll(): Promise<Installation[]> {
    const installations = await this.installationService.findAll();
    return installations;
  }
}
