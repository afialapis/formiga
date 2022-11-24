import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputCheckBoxSimple = () => {

  const [inputRef, valid, message] = useInput({
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
      message     = {message}>
      <input ref       = {inputRef}
             type      = "checkbox"
             name      = {'effects'}
             className = {valid ? 'valid' : 'invalid'}
             value     = {effects}
             onChange  = {(ev) => handleEffectsChange(ev.target.checked)}>
      </input>                
    </DemoInputGroup>
  )
}

export default DemoInputCheckBoxSimple
