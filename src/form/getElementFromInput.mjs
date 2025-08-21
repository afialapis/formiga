import getInputValue from "../input/config/getInputValue.mjs"
import {parseForCompare} from "../helpers/compare.mjs"

export default (node) => {
  const name = node.name
  const type = node.type || node.getAttribute('type')
  const validationMessage= node.validationMessage
  const value = getInputValue(node)
  const valid = validationMessage==''
  let originalValue = node.getAttribute('data-formiga-original-value')
  if (originalValue == 'undefined') {
    originalValue = undefined
  } else if (originalValue == 'null') {
    originalValue = null
  } else if (originalValue == 'true') {
    originalValue = true
  } else if (originalValue == 'false') {
    originalValue = false
  } else if (type === 'select-multiple') {
    originalValue =  originalValue.split(',')
  }

  const valueCompare = (type === 'file')
    ? node.files.length>0
      ? node.files[0].name
      : undefined
    : parseForCompare(type, value)
  
  const originalCompare = (type === 'file')
    ? originalValue
    : parseForCompare(type, originalValue)

  return {
    name,
    type,
    valid,
    validationMessage, 
    value,
    originalValue,
    hasChanged: valueCompare !== originalCompare
  }  
}
