import { describe, it, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('parsers', () => {
  it('should parse JSON file correctly', () => {
    const filepath = getFixturePath('file1.json');
    const result = parse(filepath);
    
    expect(result).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false
    });
  });
  
  it('should parse YAML file correctly', () => {
    const filepath = getFixturePath('file1.yml');
    const result = parse(filepath);
    
    expect(result).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false
    });
  });
  
  it('should throw error for unsupported extension', () => {
    const tempFile = getFixturePath('temp.txt');
    fs.writeFileSync(tempFile, 'test');
    
    expect(() => parse(tempFile)).toThrow('Unsupported file extension: .txt');
    
    fs.unlinkSync(tempFile);
  });
});
