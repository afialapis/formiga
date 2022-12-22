//import {log} from '../helpers/log'

const getInputValue = (input) => {

  if (!input) {
    return undefined
  }

  const inputType= input.type.toLowerCase()

  if (inputType=='checkbox') {
    return input.checked 
  }

  if (inputType=='select-multiple') {
    const options= Array.prototype.slice.call(input.options)
    const value = options 
                  .filter((opt) => opt.selected)
                  .map((opt) => opt.value)
    return value
  }

  if (inputType=='file') {
    try {
      return input.files[0]
    } catch(e) {
      console.error(`Formiga: error on input ${input.name} of type file: ${e.feedback}`)
      console.error(e)
      return undefined
    }
  }

  /*
   // TO CHECK: When do we need this?
  if (input.value==undefined) {
    return ''
  }
  */

  return input.value
}

export default getInputValue