import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe('js-foundation/05-factory.ts', () => {
    const getUUID = () => '1234';
    const getAge = () => 20;

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({ getAge, getUUID });
        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should return a person with name john doe', () => {

        const makePerson = buildMakePerson({ getAge, getUUID });

        const person = makePerson({ name:'John Doe', birthdate:'2002-06-15'});

        expect(person).toEqual({
            id: '1234',
            name: 'John Doe',
            birthdate: '2002-06-15',
            age: 20,
        });
    });
});