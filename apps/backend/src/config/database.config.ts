export type DatabaseConfig = {
  port: number;
  host: string;
  name: string;
  username: string;
  password: string;
};

export default (): DatabaseConfig => ({
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});
