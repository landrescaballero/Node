import { LogEntity, LogEntityOptions, LogLevel } from "../entities/log.entity";


export abstract class LogRepository{

    abstract saveLog(options: LogEntityOptions): Promise<void>;
    abstract getLogs(level:LogLevel): Promise<LogEntity[]>;

}