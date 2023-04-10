import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputTextName = () => {
  const [name, setName]= useResetableValue('John Not Doe', undefined)

  const input = useInput({
    disallowedValues: ["John Doe"],
    inputFilter: 'latin'
  })
  
  return (
    <DemoInputGroup 
      label       = {"Your name here"}
      description = {"Required. 'John Doe' is disallowed. Latin chars."}
      feedback    = {input.feedback}
      code = {`
const [name, setName]= useState('John Not Doe')

const input = useInput({
  disallowedValues: ["John Doe"],
  inputFilter: 'latin'
})

return (
  <input ref       = {input.ref}
         name      = {'name'}
         className = {input.valid ? 'valid' : 'invalid'}
         required  = {true}
         value     = {name}
         onChange  = {(event) => setName(event.target.value)}/>
)`}
      >
      <input ref       = {input.ref}
              name      = {'name'}
              className = {input.valid ? 'valid' : 'invalid'}
              required  = {true}
              value     = {name}
              onChange  = {(event) => setName(event.target.value)}/>
    </DemoInputGroup>

  )
}

export default DemoInputTextName

