import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputNumberFloatStep = () => {

  const [size, setSize]= useState(1.44)
  const [sizeRef, {valid, message}] = useInput({})  

  return (

    <DemoInputGroup 
      label       = {"Still not sure... Your size?"}
      description = {"Some float (max 2 decimals, native step = 0.01)."}
      message     = {message}>
      
      <input  ref       = {sizeRef}
              type      = "number"
              name      = {'size'}
              className = {valid ? 'valid' : 'invalid'}
              value     = {size}
              step      = {0.01}
              required  = {true}
              onChange  = {(ev) => setSize(ev.target.value)}>
      </input>                
    </DemoInputGroup> 
  )
}

export default DemoInputNumberFloatStep
