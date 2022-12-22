import {useState, useCallback, useEffect} from 'react'
import {log_input} from '../helpers/log.mjs'
import useCheckProps from './checkers/useCheckProps.mjs'
import useInputFilter from './inputFilter/useInputFilter.mjs'
import useCheckboxEnsure from './ensurers/useCheckboxEnsure.mjs'
import checkValidity from './validation/checkValidity.mjs'
import setCustomValidity from './events/setCustomValidity.mjs'

import attachInputValidationListener from './events/attachInputValidationListener.mjs'
import getInputValue from './config/getInputValue.mjs'
import { parseForCompare } from '../helpers/compare.mjs'

const _checkValue = (node, value) => {
  const nodeValue=getInputValue(node)
  const parsedNodeValue=  parseForCompare(node.type, nodeValue)
  const parsedValue = parseForCompare(node.type, value)
  return [parsedNodeValue===parsedValue, nodeValue]
}
const useInput = (props) => {

  const {transformValue, checkValue, 
        allowedValues, disallowedValues, 
        doRepeat, doNotRepeat, decimals, 
        inputFilter, feedback}= props || {}
    
  const [inputNode, setInputNode]= useState(undefined)
  const [validity, setValidity]= useState('')
  const [lastValidatedValue, setLastValidatedValue]= useState([])

  //
  // validate function
  //
  const validateInput = useCallback((node) => {
    //const [same, inputValue]= _checkValue(node, lastValidatedValue)
    //if (same) return
    //setLastValidatedValue(inputValue)

    const nValidity= checkValidity(node, transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)
    log_input(node, `input validated to [${nValidity}]`)
    setValidity(nValidity)
    setCustomValidity(node, nValidity, transformValue)
    
    return nValidity
  }, [/*lastValidatedValue, */ transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback])

  //
  // input Ref as callback
  //  
  const inputRef = useCallback(node => {
    if (node!=null) {
      log_input(node, 'inputRef callback')
      
      validateInput(node)
      setInputNode(node)
    }
  }, [validateInput]) 
  
  useEffect(() => {
    if (inputNode!= undefined) {
      const listeners= attachInputValidationListener(inputNode, validateInput)
      
      //validateInput(inputNode)
      return listeners
    }
  }, [inputNode, validateInput])

  //
  // Specific effect to check props consistency. Just DEV time
  //
  //useCheckProps(inputNode, doRepeat, doNotRepeat, inputFilter)

  //
  // Attaches input filters when needed
  //
  //useInputFilter(inputNode, inputFilter)

  //
  // Ensures checkboxes value
  //
  //useCheckboxEnsure(inputNode)



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

  const forceSetValidity = useCallback((nValidity) => {
    if (inputNode!=undefined) {
      setValidity(nValidity)
      setCustomValidity(inputNode, nValidity, transformValue)
    }
  }, [inputNode, transformValue])
  
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
    dispatchEvent
  }
}



export default useInput