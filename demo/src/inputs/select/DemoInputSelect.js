import React from 'react'
import DemoInputsSection from '../DemoInputsSection'
import DemoInputSelectSimple from './DemoInputSelectSimple'
import DemoInputSelectMultiple from './DemoInputSelectMultiple'

const DemoInputSelect = () => {

  return (
    <DemoInputsSection name="select">
      <DemoInputSelectSimple/>
      <DemoInputSelectMultiple/>
    </DemoInputsSection>
  )
}

export default DemoInputSelect