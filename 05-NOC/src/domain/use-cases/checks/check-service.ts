import { LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback =( () => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    )
    {    }    


    async execute(url: string): Promise<boolean> {
        console.log('CheckService executing...');

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('CheckService failed');
            }


            console.log('CheckService success');
            this.logRepository.saveLog({level: LogLevel.low, message: `Service ${url} is working fine`,origin:'check-service.ts'});
            this.successCallback && this.successCallback();


            return true;
        }catch(error){
            const errorMesssage = `Service ${url} is not working fine: ${error}`;
            this.logRepository.saveLog({level: LogLevel.high,message:  errorMesssage,origin:'check-service.ts'});
            this.errorCallback && this.errorCallback(errorMesssage);
            return false;
        }

        return true;
    }
}