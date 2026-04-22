#!/usr/bin/env node

import { program } from 'commander'
import gendiff from '../src/gendiff.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to first configuration file')
  .argument('<filepath2>', 'path to second configuration file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = gendiff(filepath1, filepath2, options.format)
    console.log(diff)
  })

program.parse()
