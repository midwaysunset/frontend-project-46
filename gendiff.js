#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fs = require('fs')

// чтение и парсинг
const readJsonFile = (filepath) => {
    const filedata = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(filedata);
  };

// генерация дифа
const genDiff = (file1, file2) => {
    const keys = new Set([...Object.keys(file1), ...Object.keys(file2)]);
    const sortedKeys = Array.from(keys).sort();
    const result = sortedKeys.map((key) => {
      if (!(key in file1)) {
        return `  + ${key}: ${file2[key]}`;
      }
      if (!(key in file2)) {
        return `  - ${key}: ${file1[key]}`;
      }
      if (file1[key] !== file2[key]) {
        return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
      }
      return `    ${key}: ${file1[key]}`;
    });
    return `{\n${result.join('\n')}\n}`;
  };

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const file1 = readJsonFile(filepath1);
    const file2 = readJsonFile(filepath2);
    const diff = genDiff(file1, file2);
    console.log(diff);
  })
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);