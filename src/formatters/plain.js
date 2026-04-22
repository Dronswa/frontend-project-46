import _ from 'lodash'

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const formatPlain = (diff, path = '') => {
  const lines = diff
    .filter((item) => item.type !== 'unchanged')
    .map((item) => {
      const propertyPath = path ? `${path}.${item.key}` : item.key

      switch (item.type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${stringify(item.value)}`
        case 'removed':
          return `Property '${propertyPath}' was removed`
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`
        case 'nested':
          return formatPlain(item.children, propertyPath)
        default:
          return ''
      }
    })

  return lines.join('\n')
}

export default formatPlain
