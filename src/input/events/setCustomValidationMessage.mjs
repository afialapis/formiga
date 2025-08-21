//import getElementFromInput from '../../form/getElementFromInput.mjs'
import {log_input} from '../../helpers/log.mjs'
import getInputValue from '../config/getInputValue.mjs'

const setCustomValidationMessage = (node, validationMessage, transformValue) => {

  //if (node.form.getAttribute('data-formiga-loaded')!='1') {
  //  log_input(node, `setCustomValidity( ${validity || 'ok'} )... skipping, form not ready yet`)
  //  return
  //}
  // log_input(node, `setCustomValidity( ${validity || 'ok'} )`)

  const prevValidationMessage = node.getAttribute('data-formiga-validity') 
  const prevValue = node.getAttribute('data-formiga-value') 

  // Get input value
  let value = getInputValue(node)
  if (transformValue!=undefined) {
    value= transformValue(value)
  } 
  const valueStr= value!=undefined ? value.toString() : '' 

  node.setCustomValidity(validationMessage)
  node.setAttribute('data-formiga-validity', validationMessage) 
  node.setAttribute('data-formiga-value', valueStr) 

  // Update form     
  if ((prevValue != valueStr) || (prevValidationMessage != validationMessage) ) {
    if (node.form != undefined) {
      if (node.form.getAttribute('data-formiga-loaded')=='1') {

        log_input(node, `setCustomValidity( ${validationMessage || 'ok'} ) ... dispatching formiga-form-change`)

        const event = new CustomEvent("formiga-form-change", {
          detail: {source: node}
        });
        node.form.dispatchEvent(event)
      }
    }
  }

}

export default setCustomValidationMessage
