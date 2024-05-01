import { LogLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendLogsEmail } from "../domain/use-cases/emails/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.data-source";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.data-source";
import { PostgreLogDataSource } from "../infrastructure/datasources/postgre-log.data-source";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronAdapter } from "./cron/cron-adapter";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
);
const postLogRepository = new LogRepositoryImpl(
    new PostgreLogDataSource() 
);


const mailService = new EmailService();

export class ServerApp {

    public static async start() {

        console.log('ServerApp starting...');


        //*  mandar correo
        // new SendLogsEmail(
        //     mailService,
        //     fileSystemLogRepository
        // ).execute('l.caballero0615@gmail.com');


        // const logs = await logRepository.getLogs(LogLevel.low);
        // console.log('Logs:', logs);
        

        //* Checker service
        CronAdapter.createJob(
            '*/10 * * * * *',
            () => {
                // const date = new Date();
                // console.log('You will see this message every 10 seconds', date);
                const url = 'https://www.google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postLogRepository],
                    () => console.log(`${url}`, 'is ok'),
                    (error) => console.log('CheckService error', error)
                ).execute(url);
            });


        console.log('ServerApp started');
    }

}