import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class BadRequestValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const data = validationErrors.reduce((acc, error) => {
          if (error.constraints) {
            acc[error.property] = Object.values(error.constraints)[0];
          }

          return acc;
        }, {});

        return new BadRequestException({ data });
      },
    });
  }
}
