import React from 'react'
import DemoInputsSection from '../DemoInputsSection'
import DemoInputTextAge from './DemoInputTextAge'
import DemoInputTextName from './DemoInputTextName'
import DemoInputTextWords from './DemoInputTextWords'

const DemoInputText = () => {

  return (
    <DemoInputsSection name="text">
      <DemoInputTextName/>
      {/*<DemoInputTextAge/>
      <DemoInputTextWords/>*/}
    </DemoInputsSection>
  )
}

export default DemoInputText