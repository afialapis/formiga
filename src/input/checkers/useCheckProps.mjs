import {useEffect} from 'react'
//import {log_input} from '../helpers/log.mjs'
import checkProps from './checkProps.mjs'

const useCheckProps = (inputNode, doRepeat, doNotRepeat, inputFilter) => {

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (inputNode!=undefined) {
        //log_input(inputNode, 'useCheckProps()')

        checkProps(inputNode, doRepeat, doNotRepeat, inputFilter)
      }
    }
  }, 
    [inputNode, doRepeat, doNotRepeat, inputFilter]
  )

}

export default useCheckProps
