import {useState, useCallback, useEffect, useRef} from 'react'
import {log_input} from '../helpers/log.mjs'
import useCheckProps from './checkers/useCheckProps.mjs'
import useInputFilter from './inputFilter/useInputFilter.mjs'
import useCheckboxEnsure from './ensurers/useCheckboxEnsure.mjs'
import checkValidity from './validation/checkValidity.mjs'
import setCustomValidity from './events/setCustomValidity.mjs'
import attachInputValidationListener from './events/attachInputValidationListener.mjs'
import getInputValue from './config/getInputValue.mjs'

const useInput = (props) => {
    
  const [inputNode, setInputNode]= useState(undefined)
  const [validity, setValidity]= useState('')
  const defaultValue = useRef()

  //
  // validate input callback
  //
  const validateInput = useCallback((node) => {
    const nValidity= checkValidity(node, props)
    log_input(node, `input validated to [${nValidity}]`)
    setValidity(nValidity)
    setCustomValidity(node, nValidity, props.transformValue)
    
    return nValidity
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

      if (defaultValue.current === undefined) {
        const defValue = getInputValue(node)
        defaultValue.current = defValue
        node.setAttribute('data-formiga-default-value', defaultValue.current)
      }
    }
  }, [validateInput])

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

  const forceSetValidity = useCallback((nValidity) => {
    if (inputNode!=undefined) {
      setValidity(nValidity)
      setCustomValidity(inputNode, nValidity, props.transformValue)
    }
  }, [inputNode, props.transformValue])
  
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
  

  if (inputNode!=undefined) {
    log_input(inputNode, 'render')
  }

  return {
    ref: inputRef,
    node: inputNode,
    valid: validity==='', 
    feedback: validity, 
    validate,
    setValue,
    setValidity: forceSetValidity,
    dispatchEvent,
    defaultValue: defaultValue.current
  }
}

export default useInput