import React from 'react'


const DemoInputGroup = ({children, label, message, description}) => {

  return (
    <div className="formiga-example-input-group">

      <div className="formiga-example-input-description">
        <label>
          {label}
        </label>
        <div className="formiga-example-input-description-text">
          {description}
        </div>
      </div>

      {children}
      <div className="formiga-example-input-feedback">
        {message}
      </div>
    </div>        
  )
}

export {DemoInputGroup}



