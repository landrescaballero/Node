import { create } from "domain";
import { number } from "yargs";

export interface CreateTableUseCase {
    execute: (options: createTableOptions) => string;
}

export interface createTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {
    constructor(
        /**
         * DI - Dependency Injection
         */
    ) { }

    execute({ base, limit = 10 }: createTableOptions) {
        let texto: string = `=====================================\n\t\t\tMULTIPLICATION\n\t\t\tBase: ${base}\n=====================================\n`;
        for (let index = 0; index < limit; index++) {
            const mult: string = `${base} x ${index + 1} = ${(index + 1) * base}\n`
            texto += (mult);
        };
        return texto;
    }
}