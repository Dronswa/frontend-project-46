import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import gendiff from '../src/gendiff.js';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('gendiff', () => {
  it('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFixture('result.txt');
    
    const result = gendiff(filepath1, filepath2).trim();
    expect(result).toBe(expected);
  });
  
  it('should handle identical files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file1.json');
    
    const result = gendiff(filepath1, filepath2);
    expect(result).toContain('host: hexlet.io');
    expect(result).not.toContain('+');
    expect(result).not.toContain('-');
  });
  
  it('should handle files with different keys', () => {
    const filepath1 = getFixturePath('fileA.json');
    const filepath2 = getFixturePath('fileB.json');
    
    const result = gendiff(filepath1, filepath2);
    expect(result).toContain('- age: 30');
    expect(result).toContain('+ age: 31');
    expect(result).toContain('- city: New York');
    expect(result).toContain('+ country: USA');
  });
});
