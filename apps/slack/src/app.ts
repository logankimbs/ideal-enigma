import { App, LogLevel } from "@slack/bolt";
import config from "./config";
import receiver from "./receiver";

let app: App | null = null;

const getApp = (): App => {
  if (app) return app;

  app = new App({
    logLevel: config.isDev ? LogLevel.DEBUG : LogLevel.INFO,
    receiver,
  });

  return app;
};

export default getApp();
