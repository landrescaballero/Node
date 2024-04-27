import { emailTemplate } from "../../src/js-foundation/01-template";

describe('js-foundation/01-Template.ts', () => {
    test('emailTemplate should contain a greeting', () => {
        // Assert
        expect(emailTemplate).toContain('Hi,');
    }
    );

    test('emailTemplate should contain a {{name}} and {{orderId}}', () => {
        // Arrange
        expect(emailTemplate).toContain('{{name}}');
        expect(emailTemplate).toContain('{{orderId}}');
    });
}); 