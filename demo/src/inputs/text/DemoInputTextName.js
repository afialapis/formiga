import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputTextName = () => {
  const [name, setName]= useState('John Not Doe')

  const [nameRef, {valid, message}] = useInput({
    type: 'text',
    disallowedValues: ["John Doe"],
    inputFilter: 'latin'
  })

  const handleNameChange = (event) => {
    const nName= event.target.value
    setName(nName)
  }

  return (
    <DemoInputGroup 
      label       = {"Your name here"}
      description = {"Controlled. Required. 'John Doe' is disallowed. Latin chars."}
      message     = {message}>
      <input ref       = {nameRef}
              name      = {'name'}
              className = {valid ? 'valid' : 'invalid'}
              required  = {true}
              value     = {name}
              onChange  = {(ev) => handleNameChange(ev)}/>
    </DemoInputGroup>

  )
}

export default DemoInputTextName

