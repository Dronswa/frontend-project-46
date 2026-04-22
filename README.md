# Difference Calculator

[![Node.js CI](https://github.com/Dronswa/project46/actions/workflows/ci.yml/badge.svg)](https://github.com/Dronswa/project46/actions/workflows/ci.yml)

# Demo
[![asciicast](https://asciinema.org/a/UFn58J1qM0o6JKLy.svg)](https://asciinema.org/a/UFn58J1qM0o6JKLy)

## Description

**gendiff** is a CLI tool that compares two configuration files and shows the differences between them. Supports JSON and YAML formats.

## Installation

npm install
npm link
Usage

# Compare two JSON files
gendiff file1.json file2.json

# Compare two YAML files
gendiff file1.yml file2.yml

# Compare mixed formats
gendiff file1.json file2.yml

# Show help
gendiff -h

# Show version
gendiff -V
Supported formats
JSON (.json)

YAML (.yml, .yaml)

# Examples
## Example 1: Comparing JSON files
### file1.json

{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}

### file2.json

{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}

### Output:

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}

## Example 2: Comparing YAML files
### file1.yml

host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false

### file2.yml

timeout: 20
verbose: true
host: hexlet.io

### Output:

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}

## Output Formats:

### Stylish format (default)
Visual diff with markers `+`, `-` and proper indentation.

### Plain format
Machine-readable format showing full property paths:

gendiff file1.json file2.json -f plain

## Example output:

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
