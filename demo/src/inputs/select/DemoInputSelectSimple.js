import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const LIST_OPTIONS= [
  ['' , '---'],
  [1, "It's fascinating"],
  [2, "It's cool"],
  [3, "Well... beh!"],
  [4, "Take it away from me"],
]

const DemoInputSelectSimple = () => {
  const [experience, setExperience]= useResetableValue(3, '')

  const input = useInput({
    type: 'select',
    disallowedValues: [3, 4]
  })
  
  return (
    <DemoInputGroup 
      label       = {"What do you think about Formiga?"}
      description = ""
      validationMessage    = {input.validationMessage}>

      <select ref          = {input.ref}
              name         = {'experience'}
              className    = {input.valid ? 'valid' : 'invalid'}
              required     = {true}
              value        = {experience}
              onChange     = {(ev) => setExperience(ev.target.value)}>
        {LIST_OPTIONS.map(([k,v]) => 
          <option key={`single-select-option-${k}`}
                  value={k}>
            {v}
          </option>
        )}
      </select>
    </DemoInputGroup>   
  )
}

export default DemoInputSelectSimple
