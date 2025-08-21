import getInputValue from "../input/config/getInputValue.mjs"
import {parseForCompare} from "../helpers/compare.mjs"

export default (node) => {
  const name = node.name
  const type = node.type || node.getAttribute('type')
  const validationMessage= node.validationMessage
  const value = getInputValue(node)
  const valid = validationMessage==''
  let defaultValue = node.getAttribute('data-formiga-default-value')
  if (defaultValue == 'undefined') {
    defaultValue = undefined
  } else if (defaultValue == 'null') {
    defaultValue = null
  } else if (defaultValue == 'true') {
    defaultValue = true
  } else if (defaultValue == 'false') {
    defaultValue = false
  } else if (type === 'select-multiple') {
    defaultValue =  defaultValue.split(',')
  }

  return {
    name,
    type,
    valid,
    validationMessage, 
    value,
    defaultValue,
    hasChanged: parseForCompare(type, value) !== parseForCompare(type, defaultValue)
  }  
}
