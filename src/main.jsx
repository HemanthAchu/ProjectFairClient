import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './contexts/Context.jsx'
import TokenAuth from './contexts/tokenContextAPI.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Context>
  <TokenAuth>
<BrowserRouter>
<App />
</BrowserRouter>
</TokenAuth>
</Context>
  </React.StrictMode>,
)
