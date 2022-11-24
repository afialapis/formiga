import React, {useState, useEffect, useCallback} from 'react'
import {useForm} from '../../src'



import DemoInputCheckbox from './inputs/checkbox/DemoInputCheckbox'
import DemoInputColor from './inputs/color/DemoInputColor'
import DemoInputDate from './inputs/date/DemoInputDate'
import DemoInputFile from './inputs/file/DemoInputFile'
import DemoInputNumber from './inputs/number/DemoInputNumber'
import DemoInputSelect from './inputs/select/DemoInputSelect'
import DemoInputText from './inputs/text/DemoInputText'
import DemoInputTextArea from './inputs/textarea/DemoInputTextArea'

const _getResumeFromFormElements = (elements) => {
  const resume= []
  elements.map(el => {
    resume.push({msg: el.name, style:  {marginTop: '1em', fontWeight: 'bold'}})
    resume.push({msg: el.value, style: {fontStyle: 'italic'}})
    resume.push({msg: `is ${el.valid ? 'valid!' : `invalid (${el.message})`}`, 
              style: {color: el.valid ? 'green' : 'red'}})
  })

  return resume
}


const Demo = () => {
  const [resume, setResume]= useState([])
  const [formRef, valid, elements] = useForm()
  
  const updateResume = useCallback(() => {
    setResume(_getResumeFromFormElements(elements))
  }, [elements])

  useEffect (() => {
    updateResume()
  }, [updateResume])


  console.log('DEMO render....')

  return (  

    <div className="formiga-container">
      <div className="formiga-form">
        <h1>{"Formiga's demo"}</h1>
        <form ref = {formRef}>
          <div className="formiga-form-inputs">
            <div className="formiga-form-inputs-left">
              <DemoInputText/>
              <DemoInputTextArea/>
            </div>
            <div className="formiga-form-inputs-middle">
               <DemoInputNumber/>
               <DemoInputDate/>
               <DemoInputCheckbox/>
            </div>
            <div className="formiga-form-inputs-right">
              <DemoInputSelect/>
              <DemoInputColor/>
              <DemoInputFile/>
            </div>
          </div>
            
          <div className="formiga-form-buttons">
            <a className={`btn btn-primary ${valid ? '' : 'disabled'}`}
               onClick={(_ev) => updateResume()}>
                {valid ? 'Submit' : 'Check wrong values before sumitting'}
            </a>
          </div>                 
        </form>
      </div>

      <div className="formiga-resume">
        <h1>Resume</h1>

        <div className="log">
          {resume.length>0
           ? resume.map((s, i) => 
              <div key={`log_line_${i}`}
                  className="log_line" style={{...s.style || {}}}>{s.msg}</div>
              )
            : null
           }
        </div>
      </div>
    </div>

  )
}

export {Demo}