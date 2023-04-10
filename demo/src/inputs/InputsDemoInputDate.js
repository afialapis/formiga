import React, {useState} from 'react'
import {useInput} from '../../../src'
import InputGroupList from '../layout/InputGroupList'
import InputGroup from '../layout/InputGroup'


const _code = `
const [day, setDay]= useState('2023-01-01')
const iDay = useInput()

return (
  <>
    <input 
      ref          = {iDay.ref}
      type         = "date"
      name         = {'day'}
      className    = {iDay.valid ? 'valid' : 'invalid'}
      required     = {true}
      value        = {day}
      onChange     = {(ev) => handleDayChange(ev.target.value)}/> 
    <div className="feedback">
      {iDay.feedback}
    </div>
  </>
)
`
const InputsDemoInputDate = () => {

  const iDay = useInput()

  const [day, setDay]= useState('2022-12-31')
  
  const handleDayChange = (nDay) => {
    setDay(nDay)
  }

  return (
    <InputGroupList 
      code={_code}>    
        <InputGroup 
          label       = {"Day did you last see Formiga?"}
          description = "Required. Any day at 2023."
          feedback    = {iDay.feedback}>
          <input ref          = {iDay.ref}
                type         = "date"
                name         = {'day'}
                className    = {iDay.valid ? 'valid' : 'invalid'}
                required     = {true}
                value        = {day}
                min          = '2023-01-01'
                max          = '2023-31-12'
                onChange     = {(ev) => handleDayChange(ev.target.value)}/>
        </InputGroup>
    </InputGroupList>
  )
}

export default InputsDemoInputDate