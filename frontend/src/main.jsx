import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Authcontext from './context/Authcontext.jsx'
import UserContext from './context/Usercontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Authcontext>
      <UserContext>

        <App />
      </UserContext>
      
     
    </Authcontext>
   
    
  </BrowserRouter>
   

)
