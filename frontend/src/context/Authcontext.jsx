import React, { createContext } from 'react'
export const authData = createContext();
const serverUrl="https://mini-linkedin-1389.onrender.com"
let value = {
    serverUrl
}
function Authcontext({children}) {
  return (
      <div>
        <authData.Provider value={value}>{children}</authData.Provider>  
          </div>
  )
}

export default Authcontext
