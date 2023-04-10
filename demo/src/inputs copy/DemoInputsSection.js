import React from 'react'

const DemoInputsSection = ({name, children}) => {
  return (
    <div 
      key={`section_${name}`}
      className="formiga-form-input-type-section"
      id = {name}>
      <h2>{name}</h2>
      {children}
    </div>
  )
}

export default DemoInputsSection