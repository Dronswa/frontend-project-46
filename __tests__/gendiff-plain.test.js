import { describe, it, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff plain format', () => {
  it('should output plain format for deep files', () => {
    const filepath1 = getFixturePath('file1-deep.json');
    const filepath2 = getFixturePath('file2-deep.json');
    const expected = readFixture('result-plain.txt').trim();
    
    const result = gendiff(filepath1, filepath2, 'plain').trim();
    expect(result).toBe(expected);
  });
});
