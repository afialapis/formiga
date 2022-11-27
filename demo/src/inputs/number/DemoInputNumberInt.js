import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputNumberInt = () => {

  const [pills, setPills]= useState(2)

  const [pillsRef, {valid, message}] = useInput({
    decimals: 1,
    checkValue: (v) => v>=6,
    feedback: 'Hey folk, give yourself a bit of fun!'
  })


  const handlePillsChange = (nPills) => {
    setPills(nPills)
  }


  return (
    <DemoInputGroup 
      label       = {"How many pills per dose would you like?"}
      description = {"Some >=6 integer. Decimals allowed but invalid (decimals=1)."}
      message     = {message}>
      <input  ref       = {pillsRef}
              type      = "number"
              name      = {'pills'}
              className = {valid ? 'valid' : 'invalid'}
              value     = {pills}
              required  = {false}
              onChange  = {(ev) => handlePillsChange(ev.target.value)}>
      </input>                
    </DemoInputGroup>
  )
}

export default DemoInputNumberInt
