import { log } from "console";
import { LogDataSource } from "../../domain/datasources/log.data-source";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";
import fs, { read } from 'fs';

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';


    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (!fs.existsSync(path)) return true;
            fs.writeFileSync(path, '');

        });
    }

    async saveLog(newlog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newlog)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (newlog.level === LogLevel.low) return

        if (newlog.level === LogLevel.medium) fs.appendFileSync(this.mediumLogsPath, logAsJson);

        if (newlog.level === LogLevel.high) fs.appendFileSync(this.highLogsPath, logAsJson);

    }

    private readLogsFromFiles(path: string): LogEntity[] {
        const logsFile = fs.readFileSync(path, 'utf-8');
        const logs = logsFile.split('\n').map((log) => LogEntity.fromJson(log));

        return logs;
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        switch (level) {
            case LogLevel.low:
                return this.readLogsFromFiles(this.allLogsPath);
                break;
            case LogLevel.medium:
                return this.readLogsFromFiles(this.mediumLogsPath);
                break;
            case LogLevel.high:
                return this.readLogsFromFiles(this.highLogsPath);
                break;

            default:
                throw new Error(`${level} is not implemented`);
                break;
        }
    }


}   