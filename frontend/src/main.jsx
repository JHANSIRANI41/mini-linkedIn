import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Authcontext from './context/Authcontext'
import userContext from './context/Authcontext'
import UserContext from './context/userContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Authcontext>
      <UserContext>

        <App />
      </UserContext>
      
     
    </Authcontext>
   
    
  </BrowserRouter>
   

)
