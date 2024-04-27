import { run } from 'node:test';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { argsPlugin } = await import('./args.plugin');
    return argsPlugin;
}
describe('Test in the arg plugin file', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;    
        jest.resetModules();
    });

    
    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'tables'
        }));
    });

    test('should return custom values', async () => {
        const argv = await runCommand(['-b', '8', '-l', '15', '-s', '-n', 'custom', '-d', 'custom']);

        expect(argv).toEqual(expect.objectContaining({
            b: 8,
            l: 15,
            s: true,
            n: 'custom',
            d: 'custom',
        }));
    });
});
