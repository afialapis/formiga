import React, {useState} from 'react'
import {useInput} from '../../../src'
import InputGroupList from '../layout/InputGroupList'
import InputGroup from '../layout/InputGroup'

const _code= `

const [paws, setPaws]= useState(22)

const iPaws = useInput()

return (
  <>
    <input  
      ref       = {iPaws.ref}
      type      = "number"
      name      = {'paws'}
      className = {iPaws.valid ? 'valid' : 'invalid'}
      value     = {paws}
      required  = {false}
      min       = {1}
      max       = {20}
      step      = {1}
      onChange  = {(ev) => setPaws(ev.target.value)}>
    </input>    
    <div className="feedback">
      {iPaws.feedback}
    </div>
  </>
)
`

const InputsDemoInputNumber = () => {

  const [paws, setPaws]= useState(22)

  const iPaws = useInput()

  return (
    <InputGroupList 
        code={_code}>
      <InputGroup 
        label       = {"How many Formiga will live?"}
        description = {"Optional. An <20 integer."}
        feedback    = {iPaws.feedback}>
        <input  ref       = {iPaws.ref}
                type      = "number"
                name      = {'paws'}
                className = {iPaws.valid ? 'valid' : 'invalid'}
                value     = {paws}
                required  = {false}
                min       = {1}
                max       = {20}
                step      = {1}
                onChange  = {(ev) => setPaws(ev.target.value)}>
        </input>                
      </InputGroup>
    </InputGroupList>
  )
}

export default InputsDemoInputNumber
