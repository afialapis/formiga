//import {log} from '../helpers/log'
import {parseForCompare} from '../../helpers/compare.mjs'
import getDefaultMessage from '../config/getDefaultMessage.mjs'
import getInputValue from '../config/getInputValue.mjs'

const countDecimals = (f) => {
  try {
    const s= parseFloat(f).toString()
    if (s.indexOf('e-')>0) {
      return parseInt(s.split('-')[1])
    }
    return f.toString().split('.')[1].length
  } catch(e) {
    return 0
  }
}

const  _checkValidity = (input, transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals) => {

  
  if (input==undefined) {
    return ''
  }

  // NOTE Manage 'disable' prop? sure?
  if (input.disabled===true) {
    return ''
  }

  const name= input.name
  const inputType= input.type.toLowerCase()  

  // Get input value
  let value = getInputValue(input)
  if (transformValue!=undefined) {
    value= transformValue(value)
  }

  let isEmptyValue= 
    value==undefined
    ? true
    : typeof value == 'string'
      ? value == ''
      : Array.isArray(value)
        ? value.length==0
        : false

  //log('input', `${input.name} (${input.type}) #${input.id} checkValidity() checking...`)
  
  const vs= input.validity
  if (vs!=undefined) {
    if (vs.badInput       ) { return 'badInput' }
    if (vs.patternMismatch) { return 'patternMismatch' }
    if (vs.rangeOverflow  ) { return 'rangeOverflow' }
    if (vs.rangeUnderflow ) { return 'rangeUnderflow' }
    if (vs.tooLong        ) { return 'tooLong' }
    if (vs.tooShort       ) { return 'tooShort' }
    if (vs.typeMismatch   ) { return 'typeMismatch' }
    if (vs.valueMissing   ) { return 'valueMissing' }

    if (decimals!=undefined && ! isNaN(decimals)) {
      //
      // For custom steppable inputs
      //
      if (decimals<countDecimals(value)) {
        return 'stepMismatch'
      }
    } /*else if (input.step != undefined) {
      //
      // for non steppable inputs
      //
      if (vs.valid===false  ) { return 'valid' }
    }*/
    else {
      if (vs.stepMismatch   ) { return 'stepMismatch' }
    }
  }

  //log('input', `${input.name} (${input.type}) #${input.id} checkValidity() native validity is ok, doing custom checks...`)

  // When loading document, minlength/maxlength/step constraints are not checked
  // Check this pen: https://codepen.io/afialapis/pen/NWKJoPJ?editors=1111
  // and /issues/validity_on_load
  
  if (input.maxLength && input.maxLength>0 && value.length>input.maxLength) {
    return 'tooLong'
  }
  if (input.minLength && input.minLength>0 && value.length<input.minLength) {
    return 'tooShort'
  }
  
  /*if (input.step!=undefined && input.step!=='' && input.step!=='any') {
    if (decimals==undefined || isNaN(decimals)) {
      if (countDecimals(input.step)!=countDecimals(value)) {
        return 'stepMismatch'
      }
    }
  }*/

  // Some inputs like hidden and select, wont perform 
  // the standard required validation
  if (input.required && isEmptyValue) {
    return 'valueMissing'
  }  

  // Custom validate function
  if (checkValue!=undefined) {
    const result= checkValue(value)
    if (result == Promise.resolve(result)) {
      result.then((r) => {
        if (! r) {
          return 'customError'
        }
      })
    } else {
      if (! result) {
        return 'customError'
      }
    }
  }

  // Allowed values list
  if ( (allowedValues != undefined) && (!isEmptyValue)) {
    const parsedAlloValues= disallowedValues
      .map((v) => parseForCompare(inputType, v))
    const parsedValue = parseForCompare(inputType, value)
    const exists= parsedAlloValues.indexOf(parsedValue) >= 0
    if (! exists) {
      return 'customAllowList'
    }
  }

  // Disallowed values list
  if ( (disallowedValues != undefined)) {

    const parsedDisaValues= disallowedValues
      .map((v) => parseForCompare(inputType, v))
    const parsedValue = parseForCompare(inputType, value)
    const exists= parsedDisaValues.indexOf(parsedValue) >= 0

    if (exists) {
      return 'customDisallowList'
    }
  }

  // Must repeat other's input value
  if (doRepeat!=undefined && (!isEmptyValue)) {
    const otherInput= input.form.elements[doRepeat]
    if (otherInput!=undefined) {
      if(otherInput.value != value) {
        return 'customDoRepeat'
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Formiga: You passed doRepeat=${doRepeat} to the Input Element (${name}), but there is no input with that name`)
      }
    }
  }

  // Do not repeat other's input value
  if (doNotRepeat!=undefined && (!isEmptyValue)) {
    const otherInput= input.form.elements[doNotRepeat]
    if (otherInput!=undefined) {
      if(otherInput.value == value) {
        return 'customDoNotRepeat'
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Formiga: You passed doNotRepeat=${doNotRepeat} to the Input Element (${name}), but there is no input with that name`)
      }
    }
  }
  return ''
}  

const  checkValidity = (input, props) => {
  const {transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback} = props || {}
  const chkValidity= _checkValidity(input, transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
    
  const nValidity= chkValidity==''
              ? ''
              : feedback!=undefined
                ? feedback 
                : getDefaultMessage(chkValidity)

  return nValidity

}

export default checkValidity