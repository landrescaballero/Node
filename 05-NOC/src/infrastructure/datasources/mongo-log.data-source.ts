import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.data-source";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";


export class MongoLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo Log created', newLog.id);
        
    }
    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({level: level});
    

        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
    
}