import genDiff from "../src/index.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

const answer1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff json files', () => {
  expect(genDiff(file1, file2)).toEqual(answer1);
});
