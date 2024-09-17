import { App, LogLevel } from "@slack/bolt";
import config from "./config";
import receiver from "./receiver";

let appInstance: App | null = null;

const getApp = (): App => {
  if (!appInstance) {
    appInstance = new App({
      logLevel: config.isDev ? LogLevel.DEBUG : LogLevel.INFO,
      receiver,
    });
  }

  return appInstance;
};

export default getApp();
