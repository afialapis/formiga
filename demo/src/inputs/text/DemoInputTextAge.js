import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableDefValue } from '../reset'

const DemoInputTextAge = () => {
  
  const input = useInput({
    type: 'text',
    checkValue: (v) => !isNaN(v) && parseInt(v)>=18,
    inputFilter: 'int'
  })

  const age= useResetableDefValue('33', input)

  return (
    <DemoInputGroup 
      label       = {"Your age here"}
      description = {"Uncontrolled. Required. Some >18 integer (through inputFilter)"}
      feedback    = {input.feedback}>
      <input  ref       = {input.ref}
              name      = {'age'}
              className = {input.valid ? 'valid' : 'invalid'}
              required  = {true}
              defaultValue = {age}/>
    </DemoInputGroup>
  )
}

export default DemoInputTextAge
