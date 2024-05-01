import { LogEntity, LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase{
    execute(url: string): Promise<boolean>;
}

interface LogCreationOptions{
    level: LogLevel;
    message: string;
    origin: string;
}


type SuccessCallback =( () => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    )
    {    }    

    
    private callRepositories (logOptions: LogCreationOptions){
        const newLog = new LogEntity(logOptions);
        this.logRepository.forEach(repository => {
            repository.saveLog(newLog);
        });
    }

    public async execute(url: string): Promise<boolean> {
        console.log('CheckService executing...');

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('CheckService failed');
            }


            console.log('CheckService success');
            this.callRepositories({level: LogLevel.low, message: `Service ${url} is working fine`,origin:'check-service.ts'});
            this.successCallback && this.successCallback();


            return true;
        }catch(error){
            const errorMesssage = `Service ${url} is not working fine: ${error}`;
            this.callRepositories({level: LogLevel.high,message:  errorMesssage,origin:'check-service.ts'});
            this.errorCallback && this.errorCallback(errorMesssage);
            return false;
        }

        return true;
    }
}