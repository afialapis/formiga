import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputFileSimple = () => {

  const input = useInput({
    type: 'file'
  })


  return (
    <DemoInputGroup 
      label       = {"Upload a copy of your ID Card, authorities must know you"}
      description = ""
      message     = {input.message}>
      <input ref       = {input.ref}
             type      = "file"
             name      = {'id_card'}
             className = {input.valid ? 'valid' : 'invalid'}
             required  = {true}
             />
    </DemoInputGroup>       
  )
}

export default DemoInputFileSimple
