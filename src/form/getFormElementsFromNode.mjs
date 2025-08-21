import getElementFromInput from './getElementFromInput.mjs'

export default (node) => {
  const formElements= node?.elements
  if (! formElements) {
    return []
  }

  let elements= []
  for (let idx = 0; idx < formElements.length; idx++) {
    const el= formElements.item(idx)

    const element = getElementFromInput(el)
    elements.push(element)
  } 

  elements.sort((a,b) => a.name - b.name)
  
  return elements  
}