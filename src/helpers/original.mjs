
import {parseForCompare} from "./compare.mjs"
import getInputValue from "../input/config/getInputValue.mjs"

export function getOriginalValueFromNode (node) {
  let originalValue = node.getAttribute('data-formiga-original-value')
  if (originalValue == 'undefined') {
    originalValue = undefined
  } else if (originalValue == 'null') {
    originalValue = null
  } else if (originalValue == 'true') {
    originalValue = true
  } else if (originalValue == 'false') {
    originalValue = false
  } else if (node.type === 'select-multiple') {
    originalValue =  originalValue.split(',')
  }
  return originalValue
}

export function compareOriginalValue(node) {
  const value = getInputValue(node)
  const originalValue = getOriginalValueFromNode(node)

  const valueCompare = (node.type === 'file')
    ? node.files.length>0
      ? node.files[0].name
      : undefined
    : parseForCompare(node.type, value)
  
  const originalCompare = (node.type === 'file')
    ? originalValue
    : parseForCompare(node.type, originalValue)

  return valueCompare !== originalCompare

}