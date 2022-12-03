import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputColorSimple = () => {

  const input = useInput({
    type: 'color',
    disallowedValues: ['#000000', '#FFFFFF', '#ffffff'],
    feedback: 'Neither black nor white'
  })

  const [color, setColor]= useState('#FF00FF')
  
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
