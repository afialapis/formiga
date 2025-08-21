import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputTextName = () => {
  const [name, setName]= useResetableValue('John Not Doe', undefined)

  const input = useInput({
    type: 'text',
    disallowedValues: ["John Doe"],
    inputFilter: 'latin',
    validationMessage: "'John Doe' is disallowed"
  })
  
  return (
    <DemoInputGroup 
      label       = {"Your name here"}
      description = {"Required. 'John Doe' is disallowed. Latin chars."}
      validationMessage    = {input.validationMessage}>
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

