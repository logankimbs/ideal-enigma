import { Controller, Get } from "@nestjs/common";
import { InstallationService } from "./installation.service";
import { Installation } from "./installation.entity";

@Controller("installation")
export class InstallationController {
  constructor(private readonly installationService: InstallationService) {}

  @Get()
  async findAll(): Promise<Installation[]> {
    const installations = await this.installationService.findAll();
    return installations;
  }
}
