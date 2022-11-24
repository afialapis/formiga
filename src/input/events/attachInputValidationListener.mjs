import {log_input} from '../../helpers/log.mjs'
import getValidationEvents from '../config/getValidationEvents.mjs'
import getEventTarget from '../config/getEventTarget.mjs'

const attachInputValidationListener = (node, validateInput) => {

  const validationHandler = (event) => {
    const node= getEventTarget(event)
    validateInput(node)
  }

  const validationEvents= getValidationEvents(node.type) || []
  validationEvents
    .map((eventType) => {
      node.addEventListener(eventType, validationHandler)
    })    
  
  log_input(node, `attachInputValidationListener() attached: ${validationEvents.join(', ')}`)

  // clean listeners function
  const removeAllChangeListeners = () => {
    if (node!=undefined) {
      log_input(node, `attachInputValidationListener() dettaching events`)
      validationEvents.map((eventType) => {
        node.removeEventListener(eventType, validationHandler)
      })
    } else {
      log_input(node, `attachInputValidationListener() WARNING! Could not dettach events`)
    }
  }    

  // return clean function
  return removeAllChangeListeners

}

export default attachInputValidationListener