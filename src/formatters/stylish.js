import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value
  }

  const indent = '    '.repeat(depth)
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = _.isObject(val) ? stringify(val, depth + 1) : val
    return `${indent}    ${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

const formatStylish = (diff, depth = 0) => {
  const indent = '    '.repeat(depth)
  const result = diff.map((item) => {
    switch (item.type) {
      case 'added':
        return `${indent}  + ${item.key}: ${stringify(item.value, depth + 1)}`
      case 'removed':
        return `${indent}  - ${item.key}: ${stringify(item.value, depth + 1)}`
      case 'unchanged':
        return `${indent}    ${item.key}: ${stringify(item.value, depth + 1)}`
      case 'changed':
        return `${indent}  - ${item.key}: ${stringify(item.oldValue, depth + 1)}\n${indent}  + ${item.key}: ${stringify(item.newValue, depth + 1)}`
      case 'nested':
        return `${indent}    ${item.key}: ${formatStylish(item.children, depth + 1)}`
      default:
        return ''
    }
  }).join('\n')

  return `{\n${result}\n${indent}}`
}

export default formatStylish
