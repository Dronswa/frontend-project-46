import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const parseJSON = content => JSON.parse(content)
const parseYAML = content => yaml.load(content)

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return parseJSON
    case '.yml':
    case '.yaml':
      return parseYAML
    default:
      throw new Error(`Unsupported file extension: ${extension}`)
  }
}

export default (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(fullPath, 'utf-8')
  const extension = path.extname(filepath)
  const parser = getParser(extension)

  return parser(content)
}
