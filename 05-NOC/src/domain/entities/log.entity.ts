
export enum LogLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    public level: LogLevel;
    public message: string;
    public createdAt: Date;

    constructor(level: LogLevel, message: string) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson(json: string): LogEntity {
        JSON.parse(json);
        const { level, message, createdAt } = JSON.parse(json);
        if (!message || !level || !createdAt) throw new Error('Invalid JSON, missing values');

        const log = new LogEntity(level, message);
        log.createdAt = new Date(createdAt);

        return log;

    }
}