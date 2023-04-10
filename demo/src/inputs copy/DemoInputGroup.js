import React, {useState} from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import pstyle from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const DemoInputGroup = ({children, label, feedback, description, code}) => {
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
    <div className="formiga-input-group">

      <div className="formiga-input-description">
        {description}
      </div>

      <div className={`formiga-input-input ${code!=undefined ? 'with-code' : ''}`}>

        <div className="formiga-input-label">
          <label>
            {label}
          </label>
        </div>
        
        {children}

        <div className="formiga-input-feedback">
          {feedback}
        </div>
        
        {code==undefined
         ? null
         : <>
            <div className="formiga-input-show-code">
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
        <div className="formiga-input-code">
          <SyntaxHighlighter language="javascript" style={pstyle}>
            {code.trim()}
          </SyntaxHighlighter>
          
          

          <div className="formiga-input-code-copy">
            <div role="button"
                    onClick={() => copyToClipboard()}>
              {`${copyOnIt===true ? 'Copying...' : 'Copy code'}`}
            </div>
          </div>
                    
        </div>
      }

    </div>        
  )
}

export {DemoInputGroup}



