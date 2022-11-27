import {useEffect, useState, useCallback} from 'react'
import {log_input} from '../helpers/log.mjs'
import useCheckProps from './checkers/useCheckProps.mjs'
import useInputFilter from './inputFilter/useInputFilter.mjs'
import useCheckboxEnsure from './ensurers/useCheckboxEnsure.mjs'

import useInputValidity from './validation/useInputValidity.mjs'

import attachInputValidationListener from './events/attachInputValidationListener.mjs'


const useInput = (props) => {

  const {transformValue, checkValue, 
        allowedValues, disallowedValues, 
        doRepeat, doNotRepeat, decimals, 
        inputFilter, feedback}= props
  
  const [firstValidated, setFirstValidated]= useState(false)
  const [inputNode, setInputNode]= useState(undefined)
  const [validity, validateInput]  = useInputValidity(transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)
  
  //
  // Specific effect to check props consistency. Just DEV time
  //
  useCheckProps(inputNode, doRepeat, doNotRepeat, inputFilter)

  //
  // Attaches input filters when needed
  //
  useInputFilter(inputNode, inputFilter)

  //
  // Ensures checkboxes value
  //
  useCheckboxEnsure(inputNode)

  const inputRef = useCallback(node => {
    if (node!=null) {
      log_input(node, 'inputRef callback')

      setInputNode(node)
    }
  }, [])  

  useEffect(() => {
    if (inputNode!=undefined) {
      if (!firstValidated) {
        setFirstValidated(true)
        validateInput(inputNode)
      }

      const removeAllChangeListeners = attachInputValidationListener(inputNode, validateInput)
      return removeAllChangeListeners

    }
  }, [inputNode, firstValidated, validateInput])

  if (inputNode!=undefined) {
    log_input(inputNode, 'render')
  }
  
  return [inputRef, {
    valid: validity==='', 
    message: validity, 
    forceValidation: () => validateInput(inputNode)
  }]
}



export default useInput