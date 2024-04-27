

describe('Test in the app file', () => {

    test('should be 3', () => {
        // Arrange
        const number1 = 1;
        const number2 = 2;

        // Act
        const result = number1 + number2;

        // Assert
        expect( result ).toBe(3);

    });

}); 