import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputColorSimple = () => {

  const input = useInput({
    disallowedValues: ['#000000', '#FFFFFF', '#ffffff'],
    feedback: 'Neither black nor white'
  })

  const [color, setColor]= useResetableValue('#FF00FF', '#000000')
  
  const handleColorChange = (nColor) => {
    setColor(nColor)
  }

  return (
    <DemoInputGroup 
      label       = {"What color reminds you Formiga to?"}
      description = "Neither black nor white!"
      feedback    = {input.feedback}>
      <input ref         = {input.ref}
              type        = "color"
              name        = {'color'}
              className   = {input.valid ? 'valid' : 'invalid'}
              value       = {color}
              onChange    = {(ev) => handleColorChange(ev.target.value)}>
      </input>
    </DemoInputGroup>        
  )
}

export default DemoInputColorSimple
