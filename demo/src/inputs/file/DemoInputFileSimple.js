import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputFileSimple = () => {

  const input = useInput({
    type: 'file'
  })


  return (
    <DemoInputGroup 
      label       = {"Put some file here; Formiga's strength will upload it"}
      description = ""
      validationMessage    = {input.validationMessage}>
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
