import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { NotifyContext } from './contexts/NotifyContext.js'
import AuthContext from './contexts/AuthContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <App />


  </React.StrictMode>,
)
