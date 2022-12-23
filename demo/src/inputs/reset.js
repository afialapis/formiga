import {useEffect, useState} from 'react'

const useResetHandler = (callback) => {
  useEffect(() => {
    const handler= (event) => {
      callback()
    }
    document.body.addEventListener('formiga-reset', handler)
    return () => {
      document.body.removeEventListener('formiga-reset', handler)
    }
  }, [callback])
}

const useResetableValue = (val, rval= '') => {
  const [value, setValue]= useState(val)
  
  useResetHandler(() => {
    //console.log(`resetting to value ${typeof rval} ${rval}`)
    setValue(rval)
  })
  return [value, setValue]
}

const useResetableDefValue = (val, input, rval= '') => {
  const [value, setValue]= useState(val)
  
  useResetHandler(() => {
    setValue(rval)
    input.setValue(rval)
  })
  return value
}

const triggerReset = () => {
  const event = new Event('formiga-reset')
  document.body.dispatchEvent(event)
}

export {useResetableValue, useResetableDefValue, triggerReset}