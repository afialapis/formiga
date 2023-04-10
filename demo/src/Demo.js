import React from 'react'
import StartedDemo from './started/StartedDemo'
import InputsDemo from './inputs/InputsDemo'

import '../assets/scss/index.scss'


const Demo = () => {
  return (  
    <div className="formiga-container">
      <h1>Getting Started</h1>
      <StartedDemo/>

      <h1>Samples by input type</h1>
      <InputsDemo/>
    </div>
  )
}

export default Demo