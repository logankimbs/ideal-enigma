import databaseConfig, { DatabaseConfig } from './database.config';
import slackConfig, { SlackConfig } from './slack.config';

export type AppConfig = {
  port: number;
  environment: string;
  jwtSecret: string;
  origin: {
    frontend: string;
    slack: string;
  };
  database: DatabaseConfig;
  slack: SlackConfig;
};

export default (): AppConfig => {
  return {
    port: parseInt(process.env.PORT || '4000', 10),
    environment: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
    origin: {
      frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
      slack: process.env.SLACK_URL || 'http://localhost:8080',
    },
    database: databaseConfig(),
    slack: slackConfig(),
  };
};
