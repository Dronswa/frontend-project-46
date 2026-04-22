import { describe, it, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff json format', () => {
  it('should output json format for deep files', () => {
    const filepath1 = getFixturePath('file1-deep.json');
    const filepath2 = getFixturePath('file2-deep.json');
    const expected = readFixture('result-json.json').trim();
    
    const result = gendiff(filepath1, filepath2, 'json').trim();
    expect(result).toBe(expected);
  });
  
  it('should output valid JSON', () => {
    const filepath1 = getFixturePath('file1-deep.json');
    const filepath2 = getFixturePath('file2-deep.json');
    
    const result = gendiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(result)).not.toThrow();
  });
});
