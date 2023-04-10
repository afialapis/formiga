import React from 'react'

const InputGroup = ({children, label, feedback, description}) => {

  return (
    <div className="formiga-input-group">
      <div className="formiga-input-group-top">
        <div className="formiga-input-group-label">
          <label>
            {label}
          </label>
        </div>
        <div className="formiga-input-group-description">
          {description}
        </div>
      </div>
      
      {children}

      <div className="formiga-input-group-feedback">
        {feedback}
      </div>
    </div>      
  )
}

export default InputGroup



