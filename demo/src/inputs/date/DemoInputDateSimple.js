import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const pad = (n) => 
  n.toString().padStart(2, '0')

const getToday = (add= 0) => {
  const n= new Date()
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate() + add)}`
}

const DemoInputDateSimple = () => {

  const input = useInput({
    type: 'text',
    disallowedValues: [getToday()]
  })

  const [when, setWhen]= useState(getToday(1))
  
  const handleWhenChange = (nWhen) => {
    setWhen(nWhen)
  }

  return (
    <DemoInputGroup 
      label       = {"When will you take your next Formiga?"}
      description = "Why would you wait till tomorrow"
      message     = {input.message}>
      <input ref          = {input.ref}
             type         = "date"
             name         = {'when'}
             className    = {input.valid ? 'valid' : 'invalid'}
             value        = {when}
             onChange     = {(ev) => handleWhenChange(ev.target.value)}/>
    </DemoInputGroup>
  )
}

export default DemoInputDateSimple