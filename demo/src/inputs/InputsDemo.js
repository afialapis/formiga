import React from 'react'
import {useForm} from '../../../src'
import InputsDemoInputText from './InputsDemoInputText'
import InputsDemoInputNumber from './InputsDemoInputNumber'
import InputsDemoInputDate from './InputsDemoInputDate'

const _IType = (t) => 
  <>
    {`<input `}<code className="inline">{`type="${t}"`}</code>{`>`}
  </>

const InputsDemo = () => {
  const form = useForm()
  
  return (
    <div className="formiga-section">
      <form ref = {form.ref}>
        <div className="formiga-section-description">
          {_IType("text")}
        </div>
        <div className="formiga-section-inputs">
          <InputsDemoInputText/>
        </div>

        <div className="formiga-section-description">
          {_IType("number")}
        </div>
        <div className="formiga-section-inputs">
          <InputsDemoInputNumber/>
        </div>

        <div className="formiga-section-description">
          {_IType("date")}
        </div>
        <div className="formiga-section-inputs">
          <InputsDemoInputDate/>
        </div>


        

      </form>
    </div>
  )
}

export default InputsDemo