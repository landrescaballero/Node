import { LogEntity, LogLevel } from "../entities/log.entity";


export abstract class LogRepository{

    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(level:LogLevel): Promise<LogEntity[]>;

}