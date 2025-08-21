import {useState, useCallback, useEffect, useRef} from 'react'
import {log_input} from '../helpers/log.mjs'
import useCheckProps from './checkers/useCheckProps.mjs'
import useInputFilter from './inputFilter/useInputFilter.mjs'
import useCheckboxEnsure from './ensurers/useCheckboxEnsure.mjs'
import checkValidity from './validation/checkValidity.mjs'
import setCustomValidationMessage from './events/setCustomValidationMessage.mjs'
import attachInputValidationListener from './events/attachInputValidationListener.mjs'
import getInputValue from './config/getInputValue.mjs'

const useInput = (props) => {
    
  const [inputNode, setInputNode]= useState(undefined)
  const [validationMessage, setValidationMessage]= useState('')
  const originalValue = useRef()

  //
  // validate input callback
  //
  const validateInput = useCallback((node) => {
    const nValidationMessage= checkValidity(node, props)
    log_input(node, `input validated to [${nValidationMessage}]`)
    setValidationMessage(nValidationMessage)
    setCustomValidationMessage(node, nValidationMessage, props.transformValue)
    
    return nValidationMessage
  }, [props])

  //
  // input Ref as callback
  //  
  const inputRef = useCallback(node => {
    if (node!=null) {
      log_input(node, 'inputRef callback')

      node.setAttribute('data-formiga-input', '1')

      validateInput(node)
      setInputNode(node)

      if (originalValue.current === undefined) {
        const defValue = props?.originalValue!==undefined
          ? props.originalValue
          : getInputValue(node)
        originalValue.current = defValue
        node.setAttribute('data-formiga-original-value', originalValue.current)
      }
    }
  }, [validateInput, props.originalValue])

  //
  // attach listeners on node mount
  //  
  useEffect(() => {
    if (inputNode!= undefined) {
      const listeners= attachInputValidationListener(inputNode, validateInput)
      return listeners
    }
  }, [inputNode, validateInput])

  //
  // Specific effect to check props consistency. Just DEV time
  //
  useCheckProps(inputNode, props /*doRepeat, doNotRepeat, inputFilter*/)

  //
  // Attaches input filters when needed
  //
  useInputFilter(inputNode, props.inputFilter)

  //
  // Ensures checkboxes value
  //
  useCheckboxEnsure(inputNode)

  //
  // several callbacks to return 
  //    
  const validate = useCallback(() => {
    if (inputNode!=undefined) {
      return validateInput(inputNode)
    }
    return undefined
  }, [inputNode, validateInput])

  const setValue = useCallback((v) => {
    if (inputNode!=undefined) {
      inputNode.value = v
    }
  }, [inputNode])

  const forceSetValidationMessage = useCallback((nValidationMessage) => {
    if (inputNode!=undefined) {
      setValidationMessage(nValidationMessage)
      setCustomValidationMessage(inputNode, nValidationMessage, props.transformValue)
    }
  }, [inputNode, props.transformValue])
  
  const dispatchEvent = useCallback((type, ev_props) => {
    if (inputNode==undefined) {
      return
    }
    const inputEvent = new Event(type, {
      bubbles: ev_props?.bubbles || true,
      cancelable: ev_props?.cancelable || true,
      view: ev_props?.view || window,
      detail: ev_props?.detail || ev_props?.data || {}
    })
    inputNode.dispatchEvent(inputEvent)

  }, [inputNode])
  

  if (inputNode!=undefined) {
    log_input(inputNode, 'render')
  }

  return {
    ref: inputRef,
    node: inputNode,
    valid: validationMessage==='', 
    validationMessage, 
    validate,
    setValue,
    setValidationMessage: forceSetValidationMessage,
    dispatchEvent,
    originalValue: originalValue.current
  }
}

export default useInput