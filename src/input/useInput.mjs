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
        inputFilter, feedback}= props || {}
    
  const [firstValidated, setFirstValidated]= useState(false)
  const [inputNode, setInputNode]= useState(undefined)
  const [validity, validateInput, setCustomValidity]  = useInputValidity(transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)
  
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

  //
  // input Ref as callback
  //  
  const inputRef = useCallback(node => {
    if (node!=null) {
      log_input(node, 'inputRef callback')
  
      setInputNode(node)
    }
  }, [])  

  //
  // on mount, validate input and attach handlers
  //   
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

  //
  // several callbacks to return 
  //    
  const validate = useCallback(() => {
    if (inputNode!=undefined) {
      validateInput(inputNode)
    }
  }, [inputNode, validateInput])

  const setValue = useCallback((v) => {
    if (inputNode!=undefined) {
      inputNode.value = v
    }
  }, [inputNode])

  const setValidity = useCallback((msg) => {
    if (inputNode!=undefined) {
      setCustomValidity(inputNode, msg)
    }
  }, [inputNode, setCustomValidity])
  
  const dispatchEvent = useCallback((type, props) => {
    if (inputNode==undefined) {
      return
    }
    const inputEvent = new Event(type, {
      bubbles: props?.bubbles || true,
      cancelable: props?.cancelable || true,
      view: props?.view || window,
      detail: props?.detail || props?.data || {}
    })
    inputNode.dispatchEvent(inputEvent)

  }, [inputNode])
  
  return {
    ref: inputRef,
    node: inputNode,
    valid: validity==='', 
    feedback: validity, 
    validate,
    setValue,
    setValidity,
    dispatchEvent
  }
}



export default useInput