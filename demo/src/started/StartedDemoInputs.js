import React, {useState} from 'react'
import {useInput} from '../../../src'
import InputGroupList from '../layout/InputGroupList'
import InputGroup from '../layout/InputGroup'

const startedDemoCode= `
const [name, setName]= useState('John Not Doe')

const iName = useInput({
  disallowedValues: ["John Doe"]
})

return (
  <>
    <input ref      = {iName.ref}
          name      = {'name'}
          className = {iName.valid ? 'valid' : 'invalid'}
          required  = {true}
          value     = {name}
          onChange  = {(event) => setName(event.target.value)}/>
    <div className="feedback">
      {iName.feedback}
    </div>
  </>
)
`


const startedDemoCode_OLD= `
const [name, setName]= useState('John Not Doe')
const [words, setWords]= useState("That's indeed a real thing!")

const iName = useInput({
  disallowedValues: ["John Doe"]
})

const iWords = useInput()

return (
  <>
    <input ref      = {iName.ref}
          name      = {'name'}
          className = {iName.valid ? 'valid' : 'invalid'}
          required  = {true}
          value     = {name}
          onChange  = {(event) => setName(event.target.value)}/>
    <div className="feedback">
      {iName.feedback}
    </div>

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


const StartedDemoInputs = () => {
  const [name, setName]= useState('John Not Doe')
  //const [words, setWords]= useState("That's indeed a real thing!")

  const iName = useInput({
    disallowedValues: ["John Doe"]
  })

  //const iWords = useInput({})

  
  return (
    <InputGroupList 
        code={startedDemoCode}>

      <InputGroup 
        label       = {"Your name here"}
        description = {"Required. 'John Doe' is not allowed."}
        feedback    = {iName.feedback}
        >
        <input  ref       = {iName.ref}
                name      = {'name'}
                className = {iName.valid ? 'valid' : 'invalid'}
                required  = {true}
                value     = {name}
                onChange  = {(event) => setName(event.target.value)}/>
      </InputGroup>

      {/*<InputGroup
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
      </InputGroup>*/}

    </InputGroupList>

  )
}

export default StartedDemoInputs

