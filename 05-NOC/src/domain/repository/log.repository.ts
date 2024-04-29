import { LogEntity, LogLevel } from "../entities/log.entity";


export abstract class LogRepository{

    abstract saveLog(level: LogLevel, message: string): Promise<void>;
    abstract getLogs(level:LogLevel): Promise<LogEntity[]>;

}