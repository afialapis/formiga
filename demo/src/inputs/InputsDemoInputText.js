import React, {useState} from 'react'
import {useInput} from '../../../src'
import InputGroupList from '../layout/InputGroupList'
import InputGroup from '../layout/InputGroup'

const _code= `
const [words, setWords]= useState("That's indeed a real thing!")
const iWords = useInput()

return (
  <>
    <input ref      = {iWords.ref}
          name      = {'words'}
          className = {iWords.valid ? 'valid' : 'invalid'}
          required  = {true}
          value     = {words}
          onChange  = {(event) => setWords(event.target.value)}/>
    <div className="feedback">
      {iWords.feedback}
    </div>
  </>
)

`

const InputsDemoInputText = () => {
  const [words, setWords]= useState("That's indeed a real thing!")


  const iWords = useInput({})

  
  return (
    <InputGroupList 
        code={_code}>


      <InputGroup
        label       = {"Your experience with Formiga in two words"}
        description = {`Optional. Max length 20 (currently ${words ? words.length : 0})`}
        feedback    = {iWords.feedback}>
        <input  ref          = {iWords.ref}
                name         = {'words'}
                className    = {iWords.valid ? 'valid' : 'invalid'}
                maxLength    = {20}
                value        = {words}
                onChange     = {(ev) => setWords(ev.target.value)}
                />
      </InputGroup>

    </InputGroupList>

  )
}

export default InputsDemoInputText

