import { getAge } from "../../src/plugins";

describe('plugins/get-age.plugin.ts', () => {
    test('getAge should return a number', () => {
        const birthdate = '2002-06-15';
        const age = getAge(birthdate);

        expect(typeof age).toBe('number');
    });

    test('getAge should return 19', () => {
        const birthdate = '2002-06-15';
        const age = getAge(birthdate);

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear(); 

        expect(age).toBe(calculatedAge);
    });

    test('getAge should return 0', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2002);

        const birthdate = '2002-06-15';
        const age = getAge(birthdate);

        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
});