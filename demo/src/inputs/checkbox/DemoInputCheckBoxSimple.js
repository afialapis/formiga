import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputCheckBoxSimple = () => {
  const [like, setLike]= useState(false)
  const input = useInput({
    type: 'checkbox',
    disallowedValues: [0, false],
    chackValue: (v) => v===true
  })

  

  const handleLikeChange = (nLike) => {
    setLike(nLike)
  }

  return (
    <DemoInputGroup 
      label       = {"Do you like Formiga?"}
      description = "You can be honest ;)"
      feedback    = {input.feedback}>
      <input ref       = {input.ref}
             type      = "checkbox"
             name      = {'like'}
             className = {input.valid ? 'valid' : 'invalid'}
             value     = {like}
             onChange  = {(ev) => handleLikeChange(ev.target.checked)}>
      </input>                
    </DemoInputGroup>
  )
}

export default DemoInputCheckBoxSimple
