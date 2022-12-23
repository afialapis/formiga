import React from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'
import { useResetableValue } from '../reset'

const DemoInputTextAreaSimple = () => {
  const [story, setStory]= useResetableValue('It started a warm Friday\'s night. I was bored...')

  const input = useInput({
    type: 'textarea'
  })

  const handleStoryChange = (nStory) => {
    setStory(nStory)
  }

  return (
    <DemoInputGroup 
      label       = {"Tell us more about your love story with Formiga"}
      description = {`Optional. Min length 50 (currently ${story.length}).`}
      feedback    = {input.feedback}>
      <textarea 
            ref       = {input.ref}
            name      = {'story'}
            className = {input.valid ? 'valid' : 'invalid'}
            value     = {story}
            minLength = {50}
            onChange  = {(ev) => handleStoryChange(ev.target.value)}/>
    </DemoInputGroup>    
  )
}

export default DemoInputTextAreaSimple