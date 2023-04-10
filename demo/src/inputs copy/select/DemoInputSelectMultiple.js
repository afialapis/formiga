import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const LISTM_OPTIONS= {
  '1': "08:00",
  '2': "09:00",
  '3': "10:00",
  '4': "11:00",
  '5': "12:00",
  '6': "13:00",
  '7': "14:00",
  '8': "15:00",
}


const DemoInputSelectMultiple = () => {

  const [times, setTimes]= useResetableValue(['3', '5', '7'], [])

  const input = useInput({
    disallowedValues: [['1', '3', '5', '7'], []],
    //checkValue: (v) => {console.log(`checking value ${typeof v}${v}`); return true}
  })

  const handleTimesChange = (ev) => {
    const nTimes= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
    
    setTimes(nTimes)
  }

  //console.log('---------------------' + Array.isArray(times) + '->' + times + '------------')

  return (
    <DemoInputGroup 
      label       = {"What times you prefer to code with Formiga?"}
      description = "All even hours required"
      feedback    = {input.feedback}>

      <select ref          = {input.ref}
              name         = {'times'}
              className    = {input.valid ? 'valid' : 'invalid'}
              multiple
              value        = {times}
              onChange     = {(ev) => handleTimesChange(ev)}>
        {Object.keys(LISTM_OPTIONS).map((o) => 
          <option key={`multiple-select-option-${o}`}
                  value={o}>
            {LISTM_OPTIONS[o]}
          </option>
        )}
      </select>
    </DemoInputGroup>        
  )
}

export default DemoInputSelectMultiple