import React from 'react'


const DemoInputGroup = ({children, label, validationMessage, description}) => {

  return (
    <div className="formiga-input-group">
      <div className="formiga-input-header">
        <div className="formiga-input-label">
          <label>
            {label}
          </label>
        </div>
        <div className="formiga-input-description">
          {description}
        </div>
      </div>


      {children}
      <div className="formiga-input-validation-message">
        {validationMessage}
      </div>
    </div>        
  )
}

export {DemoInputGroup}



