import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        /** repository: StorageRepository*/
    ) { }
    execute({
        fileContent,
        fileDestination = 'tables/',
        fileName = 'table'
    }: Options): boolean {
        try {
            fs.mkdirSync(`outputs/${fileDestination}`, { recursive: true });
            fs.writeFileSync(`outputs/${fileDestination}/${fileName}.txt`, fileContent);
            return true;
        } catch (e) {
            // console.error('Error al crear el archivo:', e);
            return false;
        }
    };
};
