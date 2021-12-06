import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { OceanUIProvider } from 'ocean-ui-react'
import 'ocean-ui-react/dist/index.css'
import 'ocean-ui-react/dist/tailwind.css'

ReactDOM.render(
  <OceanUIProvider>
    <App />
  </OceanUIProvider>,
  document.getElementById('root')
)
