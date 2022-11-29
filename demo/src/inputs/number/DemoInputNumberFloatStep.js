import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputNumberFloatStep = () => {

  const [size, setSize]= useState(1.44)
  const input = useInput({})  

  return (

    <DemoInputGroup 
      label       = {"Still not sure... Your size?"}
      description = {"Some float (max 2 decimals, native step = 0.01)."}
      feedback    = {input.feedback}>
      
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
