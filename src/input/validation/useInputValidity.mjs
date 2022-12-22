import {useState, useCallback} from 'react'
import checkValidity from './checkValidity.mjs'
import getDefaultMessage from '../config/getDefaultMessage.mjs'
import setCustomValidity from '../events/setCustomValidity.mjs'


const useInputValidity = (transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback) => {
  const [validity, setValidity]= useState('')

  const validateInput = useCallback((node) => {
    // Check validity
    const chkValidity= checkValidity(node, transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
    
    const nValidity= chkValidity==''
                ? ''
                : feedback!=undefined
                  ? feedback 
                  : getDefaultMessage(chkValidity)
    
    setValidity(nValidity)
    setCustomValidity(node, nValidity, transformValue)

    return nValidity
  }, [transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback])

  const handleSetValidity = useCallback((node, nValidity) => {
    setValidity(nValidity)
    setCustomValidity(node, nValidity, transformValue)
  }, [transformValue])

  return [validity, validateInput, handleSetValidity]
}

export default useInputValidity