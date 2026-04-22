import { describe, it, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('gendiff for YAML files', () => {
  it('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    
    const result = gendiff(filepath1, filepath2);
    
    expect(result).toMatch(/- follow: false/);
    expect(result).toMatch(/host: hexlet.io/);
    expect(result).toMatch(/- proxy: 123.234.53.22/);
    expect(result).toMatch(/- timeout: 50/);
    expect(result).toMatch(/\+ timeout: 20/);
    expect(result).toMatch(/\+ verbose: true/);
  });
  
  it('should handle identical YAML files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file1.yml');
    
    const result = gendiff(filepath1, filepath2);
    expect(result).toContain('host: hexlet.io');
    expect(result).not.toContain('+');
    expect(result).not.toContain('-');
  });
});
