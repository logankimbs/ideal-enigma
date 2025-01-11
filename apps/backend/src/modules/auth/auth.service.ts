import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService
  ) {}

  async getAuthCode(userId: string) {
    const code = uuid();
    await this.cacheManager.set(code, userId, 300000);

    return code;
  }

  async sign(payload) {
    return await this.jwtService.signAsync(payload);
  }
}
