import {useState, useCallback} from 'react'
import {log} from '../helpers/log.mjs'
import {checkValidity} from './checkValidity.mjs'
import {getInputValue} from '../config/getInputValue.mjs'
import {getEventTarget} from '../config/getEventTarget.mjs'
import {getDefaultMessage} from '../config/getDefaultMessage.mjs'

const useValidationHandler = (transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback) => {
  const [validity, setValidity]= useState(false)

  const handler= useCallback((event, inputRef) => {
    const input= event 
                 ? getEventTarget(event)
                 : inputRef?.current

    let nValidity= ''

    if (input!=undefined) {
      

      // Clear previous custom error
      input.setCustomValidity('')
      input.setAttribute('data-formiga-validity', '')  
      input.removeAttribute('data-formiga-value') 

      // Get input value
      let value = getInputValue(input)
      if (transformValue!=undefined) {
        value= transformValue(value)
      }

      // Check validity
      const chkValidity= checkValidity(input, value, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
      
      nValidity= chkValidity==''
                 ? ''
                 : feedback!=undefined
                   ? feedback 
                   : getDefaultMessage(chkValidity)

      // Set it
      //input.removeAttribute('readonly')
      input.setCustomValidity(nValidity)
      input.setAttribute('data-formiga-validity', nValidity) 
      input.setAttribute('data-formiga-value', value) 

      // Update form     
      if (input.form != undefined) {
        //log('input', `${input.name} (${input.type}) #${input.id} validationHandler() is raising formiga-form-change`)
        const event = new CustomEvent("formiga-form-change", {
          detail: {
            name    : input.name,
            validity: nValidity,
            valid   : nValidity=='',
            value   : value
          }
        });
        input.form.dispatchEvent(event)
      }

      log('input', `${input.name} (${input.type}) #${input.id} validationHandler() new validity is -${nValidity || 'ok'}-`)
    }

    setValidity(nValidity)
  
  }, [transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback])

  return [validity, handler]

}


export {useValidationHandler}