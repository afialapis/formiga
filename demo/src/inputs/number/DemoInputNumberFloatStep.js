import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputNumberFloatStep = () => {

  const [size, setSize]= useState(1.44)
  const [sizeRef, sizeValid, sizeMessage] = useInput({})  

  return (

    <DemoInputGroup 
      label       = {"Still not sure... Your size?"}
      description = {"Some float (max 2 decimals, native step = 0.01)."}
      message     = {sizeMessage}>
      
      <input  ref       = {sizeRef}
              type      = "number"
              name      = {'size'}
              className = {sizeValid ? 'valid' : 'invalid'}
              value     = {size}
              step      = {0.01}
              required  = {true}
              onChange  = {(ev) => setSize(ev.target.value)}>
      </input>                
    </DemoInputGroup> 
  )
}

export default DemoInputNumberFloatStep
