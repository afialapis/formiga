import React from 'react'
import DemoInputsSection from '../DemoInputsSection'
import DemoInputNumberInt from './DemoInputNumberInt'
import DemoInputNumberFloat from './DemoInputNumberFloat'
import DemoInputNumberFloatStep from './DemoInputNumberFloatStep'

const DemoInputNumber = () => {

  return (
    <DemoInputsSection name="number">
      <DemoInputNumberInt/>
      <DemoInputNumberFloat/>
      <DemoInputNumberFloatStep/>
    </DemoInputsSection>
  )
}

export default DemoInputNumber