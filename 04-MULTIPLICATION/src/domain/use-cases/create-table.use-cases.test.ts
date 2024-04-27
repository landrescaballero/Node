import { CreateTable } from "./create-table.use-cases";


describe('create table use case', () => {
    test('should return a table with 14 rows and should contain "2 x 1 = 2"', () => {
        const createTable = new CreateTable();
        const result = createTable.execute({ base: 2 });
        const rows = result.split('\n');
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows.length).toBe(14);
        expect(rows).toContain('2 x 1 = 2');
    });

    test('should return a table with costum dimensions', () => {
        const options = {
            base: 4,
            limit: 20
            };
            const createTable = new CreateTable();
            const result = createTable.execute(options);
            const rows = result.split('\n');
            expect(createTable).toBeInstanceOf(CreateTable);
            expect(rows.length).toBe(options.limit+4);
            expect(rows).toContain(`${options.base} x 1 = ${options.base}`);
    })


});