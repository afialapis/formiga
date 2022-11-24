import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputTextAge = () => {
  const [age, _setAge]= useState('33') 

  const [ageRef, ageValid, ageMessage] = useInput({
    type: 'text',
    checkValue: (v) => !isNaN(v) && parseInt(v)>=18,
    inputFilter: 'int'
  })

  return (
    <DemoInputGroup 
      label       = {"Your age here"}
      description = {"Uncontrolled. Required. Some >18 integer (through inputFilter)"}
      message     = {ageMessage}>
      <input ref       = {ageRef}
              name      = {'age'}
              className = {ageValid ? 'valid' : 'invalid'}
              required  = {true}
              defaultValue = {age}
              /*onChange  = {(ev) => setAge(ev.target.value)}*//>
    </DemoInputGroup>
  )
}

export default DemoInputTextAge
