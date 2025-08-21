import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputNumberFloatStep = () => {

  const [size, setSize]= useResetableValue(46.44, '')
  const input = useInput({})  

  return (

    <DemoInputGroup 
      label       = {"And how much weight does Farmiga can carry (in grams)?"}
      description = {"Required. Some float (max 2 decimals, native step = 0.01)."}
      validationMessage    = {input.validationMessage}>
      
      <input  ref       = {input.ref}
              type      = "number"
              name      = {'size'}
              className = {input.valid ? 'valid' : 'invalid'}
              value     = {size}
              step      = {0.01}
              required  = {true}
              onChange  = {(ev) => setSize(ev.target.value)}>
      </input>                
    </DemoInputGroup> 
  )
}

export default DemoInputNumberFloatStep
