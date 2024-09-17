"use-strict";

import { exec } from "child_process";
import ngrok from "ngrok";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async function () {
  console.log("Digging tunnel...");
  // await delay(900);

  const url = await ngrok.connect(process.env.PORT);
  console.log("Tunnel opened at:", chalk.underline(url));
  // await delay(900);

  console.log("Starting Echo...");
  const startDev = exec("ts-node src/app.ts");

  startDev.stdout.pipe(process.stdout);
  startDev.stderr.on("data", (data) => {
    process.stderr.write(chalk.red(data.toString()));
  });

  const dismantle = () => {
    ngrok.disconnect();
    process.exit();
  };

  process.on("SIGINT", dismantle);
  process.on("SIGTERM", dismantle);
})();
