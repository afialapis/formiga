import React from 'react'
import {useForm} from '../../../src'
import StartedDemoInputs from './StartedDemoInputs'


const StartedDemo = () => {
  const form = useForm()
  
  return (
    <div className="formiga-section">
      <form ref = {form.ref}>
        <div className="formiga-section-description">
          A simple example of using <code className="inline">useForm</code> and <code className="inline">useInput</code>
        </div>
        <div className="formiga-section-inputs">
          <StartedDemoInputs/>
        </div>                
      </form>
    </div>
  )
}

export default StartedDemo