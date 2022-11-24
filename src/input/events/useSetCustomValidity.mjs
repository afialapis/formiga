import {useCallback} from 'react'
import {log_input} from '../../helpers/log.mjs'
import getInputValue from '../config/getInputValue.mjs'

const useSetCustomValidity = (transformValue) => {

  const _useSetCustomValidity = useCallback((node, validity) => {
    //if (node.form.getAttribute('data-formiga-loaded')!='1') {
    //  log_input(node, `setCustomValidity( ${validity || 'ok'} )... skipping, form not ready yet`)
    //  return
    //}
    log_input(node, `setCustomValidity( ${validity || 'ok'} )`)

    const prevValidity = node.getAttribute('data-formiga-validity') 
    const prevValue = node.getAttribute('data-formiga-value') 

    // Get input value
    let value = getInputValue(node)
    if (transformValue!=undefined) {
      value= transformValue(value)
    }  

    node.setCustomValidity(validity)
    node.setAttribute('data-formiga-validity', validity) 
    node.setAttribute('data-formiga-value', value) 

    // Update form     
    if ((prevValue != value) || (prevValidity != validity) ) {
      if (node.form != undefined) {
        if (node.form.getAttribute('data-formiga-loaded')=='1') {

          log_input(node, `setCustomValidity( ${validity || 'ok'} ) ... dispatching formiga-form-change`)

          const event = new CustomEvent("formiga-form-change", {
            detail: {
              name    : node.name,
              type    : node.type,
              validity: validity,
              valid   : validity=='',
              value   : value
            }
          });
          node.form.dispatchEvent(event)
        }
      }
    }

  }, [transformValue])

  return _useSetCustomValidity
}

export default useSetCustomValidity
