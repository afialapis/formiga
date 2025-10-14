import { useEffect } from 'react'
import makeInputFilter from './makeInputFilter.mjs'


// This event list would cover every need:
// ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'],
// But lets start simple and easy. 
const INPUT_FILTER_EVENT_TYPES= ['input', 'keydown', 'mousedown']

const useInputFilter = (inputRef, inputFilter ) => {

  useEffect(() => {
    if (inputFilter==undefined) {
      return
    }

    if (inputRef == undefined) {
      return
    }

    const innerRef = inputRef?.current || inputRef


    if (innerRef==undefined) {
      return
    }


    if (innerRef.type.toLowerCase() != 'text') {
      return
    }

    let allListeners = {}

    // Input Filter listeners
    // Credits to:
    // https://stackoverflow.com/a/469362
    // https://jsfiddle.net/emkey08/zgvtjc51

    
    const theInputFilter= makeInputFilter(inputFilter, innerRef.name)

    // init auxiliar properties
    innerRef.oldValue = innerRef.value

    const filterEventListener = function(event) {
      if (theInputFilter(event.target.value)) {
        event.target.oldValue = event.target.value
      } else if (Object.hasOwnProperty.call(event.target, "oldValue")) {
        const selectionStart = event.target.selectionStart
        const selectionEnd = event.target.selectionEnd

        event.target.value = event.target.oldValue
        try {
          event.target.setSelectionRange(selectionStart-1, selectionEnd-1)
        } catch(_) {}
      } else {
        event.target.value = ""
      }
    }

    INPUT_FILTER_EVENT_TYPES.forEach(function(eventType) {
      innerRef.addEventListener(eventType, filterEventListener)
      allListeners[eventType]= filterEventListener
    })

    // clean listeners function
    const removeAllChangeListeners = () => {
      if (innerRef!=undefined) {
        Object.keys(allListeners).map((eventType) => {
          innerRef.removeEventListener(eventType, allListeners[eventType])
        })
      }
    }   
      
    // return clean function
    return removeAllChangeListeners
  }, [inputRef, inputFilter])
}

export default useInputFilter