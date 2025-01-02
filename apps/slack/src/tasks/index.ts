import cron from "node-cron";
import { reminderTask } from "./reminderTask";
import { summaryTask } from "./summaryTask";

const schedule = () => {
  const sundayBeforeMidnight = "0 23 * * 0";
  const mondayAtMidnight = "0 0 * * 1";

  cron.schedule(sundayBeforeMidnight, async () => await summaryTask());
  cron.schedule(mondayAtMidnight, async () => await reminderTask());
};

export default { schedule };
