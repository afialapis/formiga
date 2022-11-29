import React from 'react'


const DemoInputGroup = ({children, label, feedback, description}) => {

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
      <div className="formiga-input-feedback">
        {feedback}
      </div>
    </div>        
  )
}

export {DemoInputGroup}



