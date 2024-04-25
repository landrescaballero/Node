const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

const words= content.split(' ');

//Se busca la cantidad de veces que aparece la palabras React
const countReact = content.match(/react/ig ?? []).length;

const reactWords = words.filter(word => word.toLowerCase().includes('react'));

console.log('Palabras:',words.length);
console.log('React:',countReact);
console.log('React con filter:',reactWords.length);