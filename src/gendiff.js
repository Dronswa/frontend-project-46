import _ from 'lodash'
import parse from './parsers.js'
import getFormatter from './formatters/index.js'

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort()

  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] }
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] }
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const children = buildDiff(obj1[key], obj2[key])
      return { key, type: 'nested', children }
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] }
    }
    return { key, type: 'unchanged', value: obj1[key] }
  })
}

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)
  const diff = buildDiff(obj1, obj2)
  const formatter = getFormatter(format)
  return formatter(diff)
}

export default gendiff
