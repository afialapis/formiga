import React, {useState} from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import pstyle from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const InputGroupList = ({children, code}) => {
  const [codeOn, toggleCodeOn]= useState(false)
  const [copyOnIt, setCopyOnIt]= useState(false)

  async function copyToClipboard() {
    setCopyOnIt(true)
    await navigator.clipboard.writeText(code || '')
    setTimeout(() => {
      setCopyOnIt(false)
    }, 500)
    
  }

  return (
    <>
      <div className={`formiga-input-list ${code!=undefined ? 'with-code' : ''}`}>

        {children}
        
        {code==undefined
         ? null
         : <>
            <div className="formiga-input-list-show-code">
              <div role="button"
                      onClick={() => toggleCodeOn(!codeOn)}>
                {`${codeOn===true ? 'Hide code' : 'Show code'}`}
              </div>
            </div>
          </>
        }
      </div>

      {codeOn===false
      ? null
      : 
        <div className="formiga-input-list-code">
          <SyntaxHighlighter language="javascript" style={pstyle}>
            {code.trim()}
          </SyntaxHighlighter>
          
          

          <div className="formiga-input-list-code-copy">
            <div role="button"
                    onClick={() => copyToClipboard()}>
              {`${copyOnIt===true ? 'Copying...' : 'Copy code'}`}
            </div>
          </div>
                    
        </div>
      }

    </>        
  )
}

export default InputGroupList



