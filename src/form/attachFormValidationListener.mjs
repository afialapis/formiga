

import {log} from '../helpers/log.mjs'

const attachFormValidationListener = (formNode, handler) => {
  const formValidityListener = (event) => {
    log('form', `formiga-form-change on ${event?.detail?.name} (t: ${event?.detail?.type}, v: ${event?.detail?.value?.toString()})`)
    handler(event.detail.source)
  }


  try {
    formNode.setAttribute('data-formiga-loaded', '1')
  } catch(e) {
    console.error(e)
  }

  formNode.addEventListener('formiga-form-change', formValidityListener)

  if (formNode.__unheardInputs && formNode.__unheardInputs.size > 0) {
    log('form', `There are ${formNode.__unheardInputs.size} unheard inputs`)
    formNode.__unheardInputs.forEach((input) => {
      log('form', `Processing unheard input ${input.name}`)
      handler(input)
    })
    delete formNode.__unheardInputs
  }
  

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