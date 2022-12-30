// import React from 'react'
import React, { createRoot } from 'react-dom/client'
// import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Router>
    <App tab="home" />
  </Router>
)

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
