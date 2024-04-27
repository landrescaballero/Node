import { httpClient } from "../../src/plugins";

describe('plugins/http-client.plugin.ts', () => {
    test('httpClient.get() should return data', async () => {
        const data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');

        expect(data).toEqual({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: expect.any(Boolean),
        });
    });

    test('httpClient should have POST, PUT, DELETE', async () => {
const url = 'https://jsonplaceholder.typicode.com/todos/1';

        expect(httpClient.post).toBeDefined();
        expect(httpClient.put).toBeDefined();
        expect(httpClient.delete).toBeDefined();

        expect(httpClient.post).toBeInstanceOf(Function);
        expect(httpClient.put).toBeInstanceOf(Function);
        expect(httpClient.delete).toBeInstanceOf(Function);

    });
});