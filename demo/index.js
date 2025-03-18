import React from 'react'
import {createRoot} from 'react-dom/client'


import './assets/scss/index.scss'
import DemoWithHeader from './src/DemoWithHeader'

const container = document.getElementById('docaine_demo')
const root = createRoot(container)
root.render(<DemoWithHeader/>)
