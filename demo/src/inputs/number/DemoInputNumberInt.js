import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputNumberInt = () => {

  const [paws, setPaws]= useResetableValue(2, undefined)

  const input = useInput({
    decimals: 1,
    checkValue: (v) => (v==6) || isNaN(v),
    feedback: 'Hey folk, look closer to our precious icon!'
  })


  const handlePawsChange = (nPaws) => {
    setPaws(nPaws)
  }


  return (
    <DemoInputGroup 
      label       = {"How many paws does Formiga have?"}
      description = {"Optional. An =6 integer. Decimals allowed but invalid (decimals=1)."}
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
