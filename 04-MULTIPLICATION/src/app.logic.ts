import fs from 'fs';
import { argsPlugin } from './config/plugins/args.plugin';
const { b:base , l:limit , s:show }= argsPlugin;


let texto: string = 
`====================================
=          MULTIPLICATION          =
====================================\n`;

for (let index = 0; index < limit; index++) {
    const mult: string = `${base} x ${index+1} = ${(index+1) * base}\n`
    texto+=(mult);
};

if (show) console.log(texto);

// grabar en archivo de salida
// path: outputs/tabla-5.txt

const pathDir = './outputs'; // Directorio donde deseas crear el archivo
const rutaArchivo = `./outputs/tabla-${base}.txt`; // Ruta completa del archivo que deseas crear

// Crea el directorio si no existe
fs.mkdir(pathDir, { recursive: true }, (error) => {
    if (error) {
        console.error('Error al crear el directorio:', error);
        return;
    }
    
    // Escribe el contenido en el archivo
    fs.writeFile(rutaArchivo, texto, (error) => {
        if (error) {
            console.error('Error al crear el archivo:', error);
            return;
        }
        console.log('El archivo se ha creado correctamente en la ruta especificada.');
    });
});

