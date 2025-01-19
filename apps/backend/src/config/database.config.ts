export default () => ({
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  // FIXME: THIS IS VERY BAD!
  synchronize: true,
  ssl:
    process.env.NODE_ENV !== 'development'
      ? { rejectUnauthorized: false }
      : false,
});
