import exp from "constants";
import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-cases";
import { ServerApp } from "./server-app";

const runOptions = {
    base: 6,
    limit: 12,
    show: false,
    name: 'filename',
    destination: 'filedestination'
};

describe('Test in the server-app file', () => {

    test('should create server app instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });


    test('should run the server app with given options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        

        ServerApp.run(runOptions);  
        
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running');
        expect(logSpy).toHaveBeenLastCalledWith('Archivo guardado correctamente');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({base:runOptions.base, limit:runOptions.limit});    

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent:expect.any(String), 
            fileName: runOptions.name, 
            fileDestination: runOptions.destination});
    });

    test('should run with custom values mocked',()=>{

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('table');
        const saveMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveMock;

        ServerApp.run(runOptions);
        
        expect(logMock).toHaveBeenCalledTimes(2);
        expect(logMock).toHaveBeenCalledWith('Server running');

        expect(createMock).toHaveBeenCalledTimes(1);
        expect(createMock).toHaveBeenCalledWith({base:runOptions.base, limit:runOptions.limit});

        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(saveMock).toHaveBeenCalledWith({
            fileContent:expect.any(String), 
            fileName: runOptions.name, 
            fileDestination: runOptions.destination});

        expect(logMock).toHaveBeenLastCalledWith('Archivo guardado correctamente');
        expect(logErrorMock).not.toHaveBeenCalled();

    });

});