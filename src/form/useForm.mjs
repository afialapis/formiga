import {useState, useEffect, useCallback} from 'react'
import attachFormValidationListener from './attachFormValidationListener.mjs'
import getFormElementsFromNode from './getFormElementsFromNode.mjs'
import getElementFromInput from './getElementFromInput.mjs'
import {log} from '../helpers/log.mjs'

const useForm = () => {
  const [formNode, setFormNode]= useState(undefined)
  const [elements, setElements] = useState([])

  //
  // Ref callback
  //   Inits the elements array
  //
  const formRef = useCallback(node => {
    if (node!=null) {
      log('form', `formRef callback...`)

      try {
        node.noValidate= true
      } catch(e) {
        console.error(e)
      }

      setFormNode(node)

      // Init elements
      let nElements = getFormElementsFromNode(node)
      setElements(nElements)
    }
  }, [])

  
  const updateForm = useCallback((source) => {
    log('form', `updateForm callback. Changed input: ${source?.name}`)
    setElements((prevElements) => {
      return prevElements.map(el => {
        if (el.name==source?.name) {
          return getElementFromInput(source)
        }
        return el
      })
    })
  }, [])  


  useEffect(() => {
    log('form', `useEffect - node is ${formNode==undefined ? 'pending' : 'assigned'}`)
  
    if (formNode==undefined) {
      return
    }
    log('form', `useEffect - attaching listeners to formiga-form-change` )
    const removeAllChangeListeners = attachFormValidationListener(formNode, updateForm)
    return removeAllChangeListeners  
  
  }, [formNode, updateForm])

  const valid = !elements.some(el => !el.valid)
  const changedElems = JSON.stringify(elements.filter(el => el.hasChanged===true))
  const hasChanged = elements.some(el => (el.hasChanged===true))

  log('form', `Render, node is ${formNode==undefined ? 'pending' : 'assigned'}, valid is ${valid}, hasChanged is ${hasChanged} -- ${changedElems}`)
  
  return {
    ref: formRef,
    node: formNode,
    valid,
    hasChanged,
    elements
  }
}

export default useForm

