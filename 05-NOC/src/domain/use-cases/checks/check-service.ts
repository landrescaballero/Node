interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
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
            this.successCallback();
            return true;
        }catch(error){
            console.log(`${error}`);
            this.errorCallback(`${error}`);
            return false;
        }

        return true;
    }
}