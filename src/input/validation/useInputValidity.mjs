import {useState, useCallback} from 'react'

import checkValidity from './checkValidity.mjs'
import getDefaultMessage from '../config/getDefaultMessage.mjs'
import useSetCustomValidity from '../events/useSetCustomValidity.mjs'


const useGetInputVailidity = (transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback) => {
  const [validity, setValidity]= useState('')
  const setCustomValidity = useSetCustomValidity(transformValue)


  const validateInput = useCallback((node) => {

    // Check validity
    const chkValidity= checkValidity(node, transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
    
    const nValidity= chkValidity==''
                ? ''
                : feedback!=undefined
                  ? feedback 
                  : getDefaultMessage(chkValidity)
    
    setValidity(nValidity)
    setCustomValidity(node, nValidity)

    return nValidity
  }, [setCustomValidity, transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback])

  return [validity, validateInput]
}

export default useGetInputVailidity