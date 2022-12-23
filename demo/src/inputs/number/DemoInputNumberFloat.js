import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputNumberFloat = () => {

  const [weight, setWeight]= useResetableValue(1.876, '')

  const input = useInput({
    //decimals: 3
  })
  
  const handleWeightChange = (nWeight) => {
    setWeight(nWeight)
  }

  return (

    <DemoInputGroup 
      label       = {"How much Formiga weights (in milligrams)?"}
      description = {"Required. Some float (max 3 decimals, decimals = 3)."}
      feedback    = {input.feedback}>
      
      <input  ref       = {input.ref}
              type      = "number"
              name      = {'weight'}
              className = {input.valid ? 'valid' : 'invalid'}
              value     = {weight}
              required  = {true}
              onChange  = {(ev) => handleWeightChange(ev.target.value)}>
      </input>                
    </DemoInputGroup>          
  )
}

export default DemoInputNumberFloat
