import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-cases";

interface RunOptions {
    base: number;
    limit: number;
    show: boolean;
    name: string;
    destination: string;
}

export class ServerApp {


    static run({ base, limit, show, name, destination }: RunOptions) {
        console.log('Server running');

        const table = new CreateTable().execute({ base, limit });
        const wasSaved = new SaveFile()
            .execute({ fileContent: table, fileName: name, fileDestination: destination });

        if (show) console.log(table);
        (wasSaved)
            ? console.log('Archivo guardado correctamente')
            : console.log('Error al guardar el archivo');
    }
};

// function execute(arg0: { fileContent: string; fileName: string; fileDestination: string; }) {
//     throw new Error("Function not implemented.");
// }
