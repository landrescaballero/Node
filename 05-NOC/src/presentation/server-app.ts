import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.data-source";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronAdapter } from "./cron/cron-adapter";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

export class ServerApp {

    public static start(): void {

        console.log('ServerApp starting...');


        CronAdapter.createJob(
            '*/10 * * * * *',
            () => {
                // const date = new Date();
                // console.log('You will see this message every 10 seconds', date);
                const url = 'https://www.google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url}`, 'is ok'),
                    (error) => console.log('CheckService error', error)

                ).execute( url );
                // new CheckService().execute('http://localhost:3000');
            });



    }

}