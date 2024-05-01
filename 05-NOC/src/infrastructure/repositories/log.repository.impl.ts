import { LogDataSource } from "../../domain/datasources/log.data-source";
import { LogEntity, LogEntityOptions, LogLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {


    constructor(
        private readonly logDataSource: LogDataSource
    ) { }


    async saveLog(options: LogEntityOptions): Promise<void> {
        const newLog = new LogEntity(options);
        return this.logDataSource.saveLog(newLog);
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(level);
    }

}