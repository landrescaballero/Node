import exp from "constants";
import { buildLogger, logger as winstonLogger } from "../../src/plugins";

describe('plugins/logger.plugin.ts', () => {
    test('buildLogger() should return a function', () => {

        const logger = buildLogger('service');

        expect(logger).toBeDefined();
        expect(logger.log).toBeDefined();
        expect(logger.error).toBeDefined();
        expect(logger.log).toBeInstanceOf(Function);
        expect(logger.error).toBeInstanceOf(Function);
    });

    test('buildLogger().log() should log message', () => {
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
        const winstonErrorMock = jest.spyOn(winstonLogger, 'error');


        const testMessage = 'test message';
        const testService = 'test service';

        const logger = buildLogger(testService);

        logger.log(testMessage);
        logger.error(testMessage);

        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                message: testMessage,
                service: testService,
            }));
        expect(winstonErrorMock).toHaveBeenCalledWith(
            'error',
            expect.objectContaining({
                message: testMessage,
                service: testService,
            }));
    });

});