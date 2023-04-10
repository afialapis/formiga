import React from 'react'
import Demo from './Demo'

const DemoWithHeader = () => {
  return (
    <>
      <div className="formiga-main-title">
        <b>formiga</b> <i style={{color: "gray"}}>demo</i>
      </div>
      <Demo/>
    </>    
  )
}

export default DemoWithHeader