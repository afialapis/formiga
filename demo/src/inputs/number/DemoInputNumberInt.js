import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputNumberInt = () => {

  const [paws, setPaws]= useState(2)

  const input = useInput({
    decimals: 1,
    checkValue: (v) => v==6,
    feedback: 'Hey folk, look closer to our precious icon!'
  })


  const handlePawsChange = (nPaws) => {
    setPaws(nPaws)
  }


  return (
    <DemoInputGroup 
      label       = {"How many paws does Formiga have?"}
      description = {"An =6 integer. Decimals allowed but invalid (decimals=1)."}
      feedback    = {input.feedback}>
      <input  ref       = {input.ref}
              type      = "number"
              name      = {'paws'}
              className = {input.valid ? 'valid' : 'invalid'}
              value     = {paws}
              required  = {false}
              onChange  = {(ev) => handlePawsChange(ev.target.value)}>
      </input>                
    </DemoInputGroup>
  )
}

export default DemoInputNumberInt
