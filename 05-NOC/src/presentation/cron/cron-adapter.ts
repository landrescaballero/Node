import { CronJob } from "cron";
import { on } from "events";

type CronTime = Date | string;
type OnTick = () => void;

export class CronAdapter {

    static createJob( cronTime: CronTime, onTick: OnTick): CronJob{
        const job = new CronJob(
            cronTime,
            onTick);
        job.start();

        return job;
    }
}   