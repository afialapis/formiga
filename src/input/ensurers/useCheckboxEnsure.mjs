import { useEffect } from 'react'
import {log_input} from '../../helpers/log.mjs'


const useCheckboxEnsure = (inputNode) => {
  useEffect(() => {
    if (inputNode==undefined) {
      return
    }

    const inputType= inputNode.type.toLowerCase()

    // Ensure checkbox checked prop
    if (inputType === 'checkbox') {

      log_input(inputNode, 'input', `useCheckboxEnsure() ensuring value`)
      if (inputNode.value==='true' || inputNode.value===true) {
        inputNode.setAttribute('checked', true)
      }         
    }

  }, [inputNode])
}


export default useCheckboxEnsure
