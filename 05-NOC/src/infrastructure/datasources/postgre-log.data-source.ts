import { LogSeverityLevel, PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.data-source";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum ={
    low: LogSeverityLevel.LOW,
    medium: LogSeverityLevel.MEDIUM,
    high: LogSeverityLevel.HIGH,
}



export class PostgreLogDataSource implements LogDataSource {
    
    async saveLog(log: LogEntity): Promise<void> {
        const { level, message, origin, createdAt } = log;
        const severityLevel = severityEnum[level];
        const newLog = await prisma.logModel.create({
            data: {
                level: severityLevel,
                message: message,
                origin: origin,
                createdAt: createdAt,
            }
        });
        console.log('Postgre Log created', newLog.id);
    }
    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        const severityLevel = severityEnum[level];
        const logs = await prisma.logModel.findMany({
            where:{
                level: severityLevel
            }
        })
        console.log(logs);
        return logs.map(postgreLog => LogEntity.fromObject(postgreLog));
        throw new Error("Method not implemented.");
    }

}