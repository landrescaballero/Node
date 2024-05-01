
import { EmailService } from "../../../presentation/email/email.service";
import { LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendLogsEmail implements SendLogsEmailUseCase{

   constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
   ){}
    async execute(to: string | string[]) {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);  
            if(!sent){
                throw new Error('SendLogsEmail failed');
            }
            this.logRepository.saveLog({level: LogLevel.low, message: `SendLogsEmail success`, origin: 'send-logs.ts'});
            return true;
        } catch (error) {
            this.logRepository.saveLog({level: LogLevel.high, message: `SendLogsEmail failed: ${error}`, origin: 'send-logs.ts'});
        }
        return true;
    }
}