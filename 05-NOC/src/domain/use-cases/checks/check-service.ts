import { LogEntity, LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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
            this.logRepository.saveLog(LogLevel.low, `Service ${url} is working fine`);
            this.successCallback();


            return true;
        }catch(error){
            const errorMesssage = `Service ${url} is not working fine: ${error}`;
            this.logRepository.saveLog(LogLevel.high, errorMesssage);
            this.errorCallback(errorMesssage);
            return false;
        }

        return true;
    }
}