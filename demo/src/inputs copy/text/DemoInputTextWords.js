import React  from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue /*, useResetableDefValue*/ } from '../reset'

const DemoInputTextWords = () => {
  

  const input = useInput({
    //checkValue: (v) => (v!=undefined) && (v.length<=20),
  })

  const [words, setWords]= useResetableValue("That's indeed a real thing!")
  //const words= useResetableDefValue("That's indeed a real thing!", input)

  return (
    <DemoInputGroup
      label       = {"Your experience with Formiga in two words"}
      description = {`Optional. Max length 20 (currently ${words ? words.length : 0})`}
      feedback    = {input.feedback}>
      <input ref          = {input.ref}
              name         = {'words'}
              className    = {input.valid ? 'valid' : 'invalid'}
              maxLength    = {20}
              value        = {words}
              onChange     = {(ev) => setWords(ev.target.value)}
              /*defaultValue = {words}*/
              />
    </DemoInputGroup>

  )
}

export default DemoInputTextWords

