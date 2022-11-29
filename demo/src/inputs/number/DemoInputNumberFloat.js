import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputNumberFloat = () => {

  const [weight, setWeight]= useState(105.876)

  const input = useInput({
    decimals: 3
  })
  
  const handleWeightChange = (nWeight) => {
    setWeight(nWeight)
  }

  return (

    <DemoInputGroup 
      label       = {"Hmm... sounds like too much pills. How much do you weight?"}
      description = {"Some float (max 3 decimals, decimals = 3)."}
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
