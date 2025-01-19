import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedInstallError extends HttpException {
  constructor() {
    super('User not authorized to install.', HttpStatus.UNAUTHORIZED);
  }
}

export class InstallExistsError extends HttpException {
  constructor() {
    super('Installation already exists.', HttpStatus.CONFLICT);
  }
}

export class EnterpriseInstallError extends HttpException {
  constructor() {
    super('Enterprise installations not allowed.', HttpStatus.NOT_IMPLEMENTED);
  }
}
