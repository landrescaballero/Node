import { Certificate } from "crypto";

export enum LogLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogLevel,
    message: string,
    origin: string,
    createdAt?: Date
}

export class LogEntity {
    public level: LogLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson(json: string): LogEntity {
        JSON.parse(json);
        const { level, message, origin, createdAt } = JSON.parse(json);
        if (!message || !level || !origin || !createdAt) throw new Error('Invalid JSON, missing values');

        const log = new LogEntity({ level, message, origin, createdAt });

        return log;

    }
}