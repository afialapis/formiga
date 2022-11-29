import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputCheckBoxSimple = () => {

  const input = useInput({
    type: 'checkbox',
    disallowedValues: [true]
  })

  const [effects, setEffects]= useState(false)

  const handleEffectsChange = (nEffects) => {
    setEffects(Boolean(nEffects))
  }

  return (
    <DemoInputGroup 
      label       = {"Did you notice side effects?"}
      description = ""
      message     = {input.message}>
      <input ref       = {input.ref}
             type      = "checkbox"
             name      = {'effects'}
             className = {input.valid ? 'valid' : 'invalid'}
             value     = {effects}
             onChange  = {(ev) => handleEffectsChange(ev.target.checked)}>
      </input>                
    </DemoInputGroup>
  )
}

export default DemoInputCheckBoxSimple
