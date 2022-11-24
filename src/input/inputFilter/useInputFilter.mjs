import { useEffect } from 'react'
import makeInputFilter from './makeInputFilter.mjs'


// This event list would cover every need:
// ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'],
// But lets start simple and easy. 
const INPUT_FILTER_EVENT_TYPES= ['input', 'keydown', 'mousedown']

const useInputFilter = (inputNode, inputFilter ) => {

  useEffect(() => {
    if (inputFilter==undefined) {
      return
    }

    if (inputNode==undefined) {
      return
    }

    if (inputNode.type.toLowerCase() != 'text') {
      return
    }

    let allListeners = {}

    // Input Filter listeners
    // Credits to:
    // https://stackoverflow.com/a/469362
    // https://jsfiddle.net/emkey08/zgvtjc51

    
    const theInputFilter= makeInputFilter(inputFilter, inputNode.name)

    // init auxiliar properties
    inputNode.oldValue = inputNode.value

    const filterEventListener = function(event) {
      if (theInputFilter(event.target.value)) {
        event.target.oldValue = event.target.value
      } else if (Object.hasOwnProperty.call(event.target, "oldValue")) {
        const selectionStart = event.target.selectionStart
        const selectionEnd = event.target.selectionEnd

        event.target.value = event.target.oldValue
        try {
          event.target.setSelectionRange(selectionStart-1, selectionEnd-1)
        } catch(e) {}
      } else {
        event.target.value = ""
      }
    }

    INPUT_FILTER_EVENT_TYPES.forEach(function(eventType) {
      inputNode.addEventListener(eventType, filterEventListener)
      allListeners[eventType]= filterEventListener
    })

    // clean listeners function
    const removeAllChangeListeners = () => {
      if (inputNode!=undefined) {
        Object.keys(allListeners).map((eventType) => {
          inputNode.removeEventListener(eventType, allListeners[eventType])
        })
      }
    }   
      
    // return clean function
    return removeAllChangeListeners
  }, [inputNode, inputFilter])
}

export default useInputFilter