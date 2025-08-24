import getInputValue from "../input/config/getInputValue.mjs"
import {
  getOriginalValueFromNode,
  compareOriginalValue} from "../helpers/original.mjs"

export default (node) => {
  const name = node.name
  const type = node.type || node.getAttribute('type')
  
  // For some reason, node.validationMessage is not reliable when 
  //    accessing it from here.
  // const validationMessage= node.validationMessage
  const validationMessage= node.getAttribute('data-formiga-validity')

  const value = getInputValue(node)
  const valid = validationMessage==''
  const originalValue = getOriginalValueFromNode(node)
  const hasChanged = compareOriginalValue(node)

  return {
    name,
    type,
    valid,
    validationMessage, 
    value,
    originalValue,
    hasChanged
  }  
}
