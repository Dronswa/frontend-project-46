import { describe, it, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff for deep structures', () => {
  it('should compare deep JSON files correctly', () => {
    const filepath1 = getFixturePath('file1-deep.json');
    const filepath2 = getFixturePath('file2-deep.json');
    const expected = readFixture('result-deep.txt').trim();
    
    const result = gendiff(filepath1, filepath2).trim();
    expect(result).toBe(expected);
  });
  
  it('should compare deep YAML files correctly', () => {
    const filepath1 = getFixturePath('file1-deep.yml');
    const filepath2 = getFixturePath('file2-deep.yml');
    const expected = readFixture('result-deep.txt').trim();
    
    const result = gendiff(filepath1, filepath2).trim();
    expect(result).toBe(expected);
  });
  
  it('should handle identical deep files', () => {
    const filepath1 = getFixturePath('file1-deep.json');
    const filepath2 = getFixturePath('file1-deep.json');
    
    const result = gendiff(filepath1, filepath2);
    expect(result).toContain('setting1: Value 1');
  });
});
