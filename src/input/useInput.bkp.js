import {useEffect, useState, useCallback} from 'react'
import {log_input} from '../helpers/log.mjs'
import useCheckProps from './checkers/useCheckProps.mjs'
import useInputFilter from './inputFilter/useInputFilter.mjs'
import useCheckboxEnsure from './ensurers/useCheckboxEnsure.mjs'

import useInputValidity from './validation/useInputValidity.mjs'

import attachInputValidationListener from './events/attachInputValidationListener.mjs'
//import setCustomValidity from './events/setCustomValidity.mjs'
import getInputValue from './config/getInputValue.mjs'


const useInput = (props) => {

  const {transformValue, checkValue, 
        allowedValues, disallowedValues, 
        doRepeat, doNotRepeat, decimals, 
        inputFilter, feedback}= props || {}
    
  const [lastValidatedValue, setLastValidatedValue]= useState(undefined)
  const [inputNode, setInputNode]= useState(undefined)
  //const [inputValue, setInputValue]= useState(undefined)
  const [validity, validateInput, handleSetValidity/*, setCustomValidity*/]  = useInputValidity(transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)
  
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

  // useEffect(() => {
  //   if (inputNode!=undefined) {
  //     setInputValue(getInputValue(inputNode))
  //   }
  // }, [inputNode])

  //
  // on mount, attach handlers
  //   
  useEffect(() => {
    if (inputNode!=undefined) {
      console.log(`${inputNode.name} -- useEffect.attachInputValidationListener`)
      const removeAllChangeListeners = attachInputValidationListener(inputNode, validateInput)
      return removeAllChangeListeners
    }
  }, [inputNode, validateInput])

  //
  // on mount and on value changes, validate input
  //   

// ESTE ES EL QUE HACE QUE SE REVALIDE EL INPUT DESPUES DE UN CAMBIO EXTERNO (como forzar un setValue())
// PERO NO TIENE SENTIDO QUE SEA ASI
// POR EJEMPLO EN DEMO--AGE no se lanza porque no hay ninguna propiedad especial en el useInput()
// entonces no tiene algun re-render por ahi
// 
// quiza haya que arreglar primero para que, tanto si hay como sin hay props especiales en el useInput, funcione todo igual


  useEffect(() => {
    if (inputNode!=undefined) {
      const inputValue= getInputValue(inputNode)
      console.log(inputNode.name + ' lastValidatedValue ' + lastValidatedValue + ' --- nodeValue ' + typeof inputValue + ' --- ' + inputValue)
      if (lastValidatedValue==undefined || (lastValidatedValue !== inputValue)) {
        setLastValidatedValue(inputValue==undefined ? '' : inputValue)
        validateInput(inputNode)
      }
    }
  }, [inputNode, /*inputValue,*/ lastValidatedValue, validateInput])

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
      //setCustomValidity(inputNode, msg, transformValue)
      handleSetValidity(inputNode, msg)
    }
  }, [inputNode /*, setCustomValidity*/, handleSetValidity])
  
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