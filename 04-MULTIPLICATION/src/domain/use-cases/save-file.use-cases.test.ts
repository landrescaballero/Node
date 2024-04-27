import { SaveFile } from "./save-file.use-cases";
import fs from 'fs';


describe('save file use case', () => {

    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });

    afterEach(() => {
        const fileFolderExists = fs.existsSync('outputs');
        if (fileFolderExists) fs.rmSync('outputs', { recursive: true });
    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        expect(saveFile).toBeInstanceOf(SaveFile);

        const options = {
            fileContent: 'test',
        };


        const result = saveFile.execute(options);
        expect(result).toBe(true);


        const filePath = 'outputs/tables/table.txt';
        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBe(true);

        const checkFileContent = fs.readFileSync(filePath, 'utf-8');
        expect(checkFileContent).toBe(options.fileContent);


    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
        expect(saveFile).toBeInstanceOf(SaveFile);

        const options = {
            fileContent: 'test',
            fileDestination: 'test',
            fileName: 'test'
        };

        const result = saveFile.execute(options);
        expect(result).toBe(true);

        const filePath = `outputs/${options.fileDestination}/${options.fileName}.txt`;
        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBe(true);

        const checkFileContent = fs.readFileSync(filePath, 'utf-8');
        expect(checkFileContent).toBe(options.fileContent);

    });


    test('should return false if error', () => {
        const saveFile = new SaveFile();

        const mkDirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is an error message from testing') });


        const result = saveFile.execute({ fileContent: 'test' });
        expect(result).toBe(false);

        mkDirMock.mockRestore();
    });


    test('should return false if file cannot be created', () => {
        const saveFile = new SaveFile();

        const saveFileSPy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a writing error message from testing') });


        const result = saveFile.execute({ fileContent: 'test' });
        expect(result).toBe(false);

        saveFileSPy.mockRestore();
    });

});