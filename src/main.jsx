import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// npm install formik
import './index.css'
import App from './components/App/App'

// import GitHubApp from './components/GitHubApp/GitHubApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
