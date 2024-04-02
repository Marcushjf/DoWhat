import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
)
