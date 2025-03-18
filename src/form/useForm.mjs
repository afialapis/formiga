import {useState, useEffect, useCallback} from 'react'
import attachFormValidationListener from './attachFormValidationListener.mjs'
import {log} from '../helpers/log.mjs'

const _getFormElements = (node) => {
  const formElements= node?.elements
  if (! formElements) {
    return []
  }

  let elements= []
  for (let idx = 0; idx < formElements.length; idx++) {
    const el= formElements.item(idx)

    const name = el.name
    const type = el.type || el.getAttribute('type')
    const feedback= el.getAttribute('data-formiga-validity') || ''
    const value= el.getAttribute('data-formiga-value') || ''
    const valid = feedback==''

    elements.push({
      name,
      type,
      valid,
      feedback, 
      value
    })
  } 

  elements.sort((a,b) => a.name - b.name)
  
  return elements
}

const _areAllValid = (elements) => {
  for (const e of elements) {
    if (!e.valid) {
      return false
    }
  }
  return true
}

const useForm = () => {

  const [formNode, setFormNode]= useState(undefined)
  const [elements, setElements] = useState([])
  const [valid, setValid] = useState(true)

  const updateForm = useCallback((node) => {
    log('form', `updateForm callback (${node?.elements?.length} inputs)`)
    let nElements = _getFormElements(node)
    setElements(nElements)
    setValid(_areAllValid(nElements))
  }, [])

  const formRef = useCallback(node => {
    log('form', `formRef callback`)

    if (node!=null) {
      try {
        node.noValidate= true
      } catch(e) {
        console.error(e)
      }

      try {
        node.setAttribute('data-formiga-loaded', '1')
      } catch(e) {
        console.error(e)
      }
      
      
      updateForm(node)
      setFormNode(node)
    }
  }, [updateForm])


  useEffect(() => {
    log('form', `useEffect - node is ${formNode==undefined ? 'pending' : 'assigned'}`)
  
    if (formNode==undefined) {
      return
    }

    const removeAllChangeListeners = attachFormValidationListener(formNode, updateForm)
    return removeAllChangeListeners  
  
  }, [formNode, updateForm])



  log('form', `Render, node is ${formNode==undefined ? 'pending' : 'assigned'}, valid is ${valid}`)
  
  return {
    ref: formRef,
    node: formNode,
    valid,
    elements
  }
}

export default useForm

