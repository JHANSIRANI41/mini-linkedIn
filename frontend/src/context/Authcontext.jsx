import React, { createContext } from 'react'
export const authData = createContext();
const serverUrl="http://localhost:8000"
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