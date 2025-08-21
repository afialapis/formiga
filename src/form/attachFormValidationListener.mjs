

import {log} from '../helpers/log.mjs'

const attachFormValidationListener = (formNode, handler) => {
  const formValidityListener = (event) => {

    log('form', `formiga-form-change on ${event?.detail?.name} (t: ${event?.detail?.type}, v: ${event?.detail?.value?.toString()})`)
    handler(event.detail.source)
  }

  formNode.addEventListener('formiga-form-change', formValidityListener)
  

  // clean listeners function
  const removeAllChangeListeners = () => {
    if (formNode!=undefined) {
      log('form', `formiga-form-change listeners dettaching` )

      formNode.removeEventListener('formiga-form-change', formValidityListener)
    }
  }   
  
  return removeAllChangeListeners
}

export default attachFormValidationListener