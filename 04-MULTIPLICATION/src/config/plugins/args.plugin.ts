import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argsPlugin = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'multiplication base number'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'multiplication limit number'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'show multiplication table in console'
    })
    .option('n', {
        alias: ' name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'File name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'tables',
        describe: 'File destination'
    })
    .check((argv, options) => {

        if (argv.b < 1) throw new Error('The base must be greater than 0');


        if (argv.l < 1) throw new Error('The limit must be greater than 0');

        return true;
    })
    .parseSync();

