

import getEventTarget from '../input/config/getEventTarget.mjs'
import {log} from '../helpers/log.mjs'
const attachFormValidationListener = (formNode, handler) => {
  const formValidityListener = (event) => {

    log('form', `formiga-form-change on ${event?.detail?.name} (t: ${event?.detail?.type}, v: ${event?.detail?.value?.toString()})`)
    
    handler(getEventTarget(event))
  }

  formNode.addEventListener('formiga-form-change', formValidityListener)
  log('form', `useEffect: formiga-form-change listeners attached` )

  // clean listeners function
  const removeAllChangeListeners = () => {
    if (formNode!=undefined) {
      log('form', `useEffect: formiga-form-change listeners dettaching` )

      formNode.removeEventListener('formiga-form-change', formValidityListener)
    }
  }   
  
  return removeAllChangeListeners
}

export default attachFormValidationListener