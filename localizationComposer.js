// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const jsonInputPath = 'src/resources/en-gb.json';
const inputFolder = 'src/resources';
const interfaceOutputPath = 'src/resources/localization.ts';
const newLine = '\r\n';
const interfaceDeclaration = `export interface ILocalization {${newLine}`;

if (!fs.existsSync(jsonInputPath)) {
  throw new Error('Localization file does not exist');
}

const localizations = JSON.parse(fs.readFileSync(jsonInputPath, 'utf8'));
let temp = '';
for (const key in localizations) {
  temp += `  /**${localizations[key]}*/${newLine}`;
  temp += `  ${key}: string;${newLine}`;
}

const generatedFile = interfaceDeclaration + temp + `}${newLine}`;
fs.writeFileSync(interfaceOutputPath, generatedFile);

fs.readdir(inputFolder, (err, files) => {
  const jsonFiles = files.filter(f => f.endsWith('json'));
  jsonFiles.forEach(file => {
    const language = file.replace('.json', '');
    const localeName = language.replace('-', '_').toUpperCase();
    const outputPath = inputFolder + '/' + language + '.ts';
    const inputPath = inputFolder + '/' + file;

    const importStatement = `import { ILocalization } from './localization';${newLine}${newLine}`;
    const objectDeclaration = `export const ${localeName}: ILocalization = {${newLine}`;

    const localizations2 = JSON.parse(fs.readFileSync(inputPath));
    temp = '';
    for (const key in localizations2) {
      temp += `  ${key}: '${localizations2[key]}',${newLine}`;
    }
    const generatedObject = importStatement + objectDeclaration + temp + `};${newLine}`;
    fs.writeFileSync(outputPath, generatedObject);
  });
});
