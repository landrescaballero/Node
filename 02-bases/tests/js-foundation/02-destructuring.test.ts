import { characters } from "../../src/js-foundation/02-destructuring";

 describe('js-foundation/02-destructuring.ts', () => {
        test('should be batman', () => {
            // Act
            const [ , , ,batman ] = characters;
    
            // Assert
            expect(batman).toBe('Batman');
        });

        test('should contain Flash and Superman',()=>{
            expect( characters ).toContain('Flash');
            expect( characters ).toContain('Superman');
        });

        test('first character should be Flash and second Superman',()=>{
            const [flash, superman] = characters;
            
            expect( flash ).toBe('Flash');
            expect( superman ).toBe('Superman');
        });
    });