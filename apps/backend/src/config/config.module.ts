import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const config = () => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    port: parseInt(process.env.PORT || '4000', 10),
    jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
    origin: {
      frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
      slack: process.env.SLACK_URL || 'http://localhost:8080',
    },
    database: {
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: true, // FIXME: THIS IS VERY BAD!
      ssl: !isDev ? { rejectUnauthorized: false } : false,
    },
    slack: {
      secretKey: process.env.SLACK_SECRET_KEY,
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      openId: {
        state: process.env.SLACK_STATE_SECRET,
        nonce: process.env.SLACK_NONCE,
      },
    },
  };
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class Config {}
