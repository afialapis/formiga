import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputTextWords = () => {
  const [words, setWords]= useState('another dimension man!')

  const input = useInput({
    type: 'text'
  })

  return (
    <DemoInputGroup
      label       = {"Your experience with Formiga in two words"}
      description = {`Controlled. Not required. Max length 20 (currently ${words ? words.length : 0})`}
      feedback    = {input.feedback}>
      <input ref          = {input.ref}
              name         = {'why'}
              className    = {input.valid ? 'valid' : 'invalid'}
              maxLength    = {20}
              value        = {words}
              onChange     = {(ev) => setWords(ev.target.value)}/>
    </DemoInputGroup>

  )
}

export default DemoInputTextWords

