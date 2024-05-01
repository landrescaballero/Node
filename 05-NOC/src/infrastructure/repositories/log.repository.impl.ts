import { LogDataSource } from "../../domain/datasources/log.data-source";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {


    constructor(
        private readonly logDataSource: LogDataSource
    ) { }


    async saveLog(newLog: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(newLog);
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(level);
    }

}