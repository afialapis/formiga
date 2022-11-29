import React, {useState} from 'react'
import {useInput} from '../../../../src'
import {DemoInputGroup} from '../DemoInputGroup'

const DemoInputTextAreaSimple = () => {
  const [story, setStory]= useState('It started a warm Friday\'s night. I was bored...')

  const input = useInput({
    type: 'textarea'
  })

  const handleStoryChange = (nStory) => {
    setStory(nStory)
  }

  return (
    <DemoInputGroup 
      label       = {"Tell us more about your love story with Formiga"}
      description = {`Not required. Min length 50 (currently ${story.length}).`}
      message     = {input.message}>
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