import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const pad = (n) => 
  n.toString().padStart(2, '0')

const getToday = (add= 0) => {
  const n= new Date()
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate() + add)}`
}

const DemoInputDateSimple = () => {

  const input = useInput({
    disallowedValues: [getToday(-1)]
  })

  const [when, setWhen]= useResetableValue(getToday(-1), undefined)
  
  const handleWhenChange = (nWhen) => {
    setWhen(nWhen)
  }

  return (
    <DemoInputGroup 
      label       = {"When did you last see Formiga?"}
      description = "Required. Just yesterday is disallowed."
      feedback    = {input.feedback}>
      <input ref          = {input.ref}
             type         = "date"
             name         = {'when'}
             className    = {input.valid ? 'valid' : 'invalid'}
             required     = {true}
             value        = {when}
             onChange     = {(ev) => handleWhenChange(ev.target.value)}/>
    </DemoInputGroup>
  )
}

export default DemoInputDateSimple