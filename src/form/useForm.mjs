import {useState, useEffect, useCallback} from 'react'
import attachFormValidationListener from './attachFormValidationListener.mjs'
import {log} from '../helpers/log.mjs'


// let hash= elements.map(e => JSON.stringify(e)).join(',')

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
    const message= el.getAttribute('data-formiga-validity') || ''
    const value= el.getAttribute('data-formiga-value') || ''
    const valid = message==''

    elements.push({
      name,
      type,
      valid,
      message, 
      value
    })
  } 

  elements.sort((a,b) => a.name - b.name)
  
  return elements
}

const _compareElements = (el1, el2) => {
  return JSON.stringify(el1) == JSON.stringify(el2)
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
      
      setFormNode(node)
    }
  }, [])

  const updateForm = useCallback((node) => {
    log('form', `updateForm callback (${node?.elements?.length} inputs)`)

    let nElements = _getFormElements(node)
    setElements(nElements)

  }, [])
  
  useEffect(() => {
    log('form', `useEffect - ${formNode==undefined}`)

    if (formNode==undefined) {
      return
    }

    updateForm(formNode)

    const removeAllChangeListeners = attachFormValidationListener(formNode, updateForm)
    return removeAllChangeListeners  


  }, [formNode, updateForm])



  log('form', `Render, valid is ${_areAllValid(elements)}`)
  
  return [formRef, _areAllValid(elements), elements]
}

export default useForm

