import { ServerApp } from "./presentation/server-app";


describe('Test in the app.ts file', () => {

    test('should call run with values', async () => {
        const serverRunMuck = jest.fn();

        ServerApp.run = serverRunMuck;
        process.argv = ['node', 'app', '-b','5', '-l','10', '-name','table', '-d','tables'];

        await import('./app');


        expect(serverRunMuck).toHaveBeenCalledWith({
            base: 5,
            limit: 10,
            show: false,
            name: 'multiplication-table',
            destination: 'tables',
        });
    });

});