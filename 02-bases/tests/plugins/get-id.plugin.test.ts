import { getUUID } from "../../src/plugins";

describe('plugins/get-id.plugin.ts', () => {
    test('getUUID should return a string', () => {
        const id = getUUID();

        expect(typeof id).toBe('string');
    });

    test('getUUID should return a string with 36 characters', () => {
        const id = getUUID();

        expect(id.length).toBe(36);
    });

    test('getUUID should return a string with 36 characters', () => {
        const id = getUUID();

        expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
});