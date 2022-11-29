import {useEffect, useState, useCallback, useRef} from 'react'
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
  
  const inputRef = useRef()
  
  const [firstValidated, setFirstValidated]= useState(false)
  //const [inputNode, setInputNode]= useState(undefined)
  const [validity, validateInput, setCustomValidity]  = useInputValidity(transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)
  
  //
  // Specific effect to check props consistency. Just DEV time
  //
  useCheckProps(/*inputNode*/ inputRef?.current, doRepeat, doNotRepeat, inputFilter)

  //
  // Attaches input filters when needed
  //
  useInputFilter(/*inputNode*/ inputRef?.current, inputFilter)

  //
  // Ensures checkboxes value
  //
  useCheckboxEnsure(/*inputNode*/ inputRef?.current)

  //  const inputRef = useCallback(node => {
  //    if (node!=null) {
  //      log_input(node, 'inputRef callback')
  //
  //      setInputNode(node)
  //    }
  //  }, [])  

  useEffect(() => {
    if (/*inputNode*/ inputRef?.current!=undefined) {
      if (!firstValidated) {
        setFirstValidated(true)
        validateInput(/*inputNode*/ inputRef.current)
      }

      const removeAllChangeListeners = attachInputValidationListener(/*inputNode*/ inputRef.current, validateInput)
      return removeAllChangeListeners

    }
  }, [/*inputNode*/ firstValidated, validateInput])

  if (/*inputNode*/ inputRef?.current!=undefined) {
    log_input(/*inputNode*/ inputRef.current, 'render')
  }

  const validate = useCallback(() => {
    if (/*inputNode*/ inputRef?.current!=undefined) {
      validateInput(/*inputNode*/ inputRef?.current)
    }
  }, [/*inputNode*/ validateInput])

  const setValue = useCallback((v) => {
    if (/*inputNode*/ inputRef?.current!=undefined) {
      /*inputNode*/ inputRef.current.value = v
    }
  }, [/*inputNode*/])

  const setValidity = useCallback((msg) => {
    if (/*inputNode*/ inputRef?.current!=undefined) {
      setCustomValidity(/*inputNode*/ inputRef.current, msg)
    }
  }, [/*inputNode*/ setCustomValidity])
  
  const dipatchEvent = useCallback((type, data, bubbles= false) => {
    if (inputRef?.current==undefined) {
      return
    }
    const inputEvent = new CustomEvent(type, {
      bubbles,
      detail: data || {}
    })
    inputRef.current.dispatchEvent(inputEvent)

  }, [])
  
  return [inputRef, {
    valid: validity==='', 
    message: validity, 
    //inputNode,
    validate,
    setValue,
    setValidity,
    dipatchEvent
  }]
}



export default useInput