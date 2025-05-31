import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ReviewProvider } from './context/ReviewContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReviewProvider>
      <App />
    </ReviewProvider>
  </React.StrictMode>
)