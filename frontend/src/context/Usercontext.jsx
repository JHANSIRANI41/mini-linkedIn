import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authData } from './Authcontext';
export const userDataContext = createContext();

function UserContext({ children }) {
    let [userData, setUserData] = useState(null);
    let {serverUrl}=useContext(authData)

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/currentUser", {
                withCredentials:true
            })
            setUserData(result.data)
            console.log(result)
         }
        catch (error)
        {
              setUserData(null)
            console.log(error);

        }
 }

    useEffect(() => {
    getCurrentUser()
},[])


    const value = {
    userData,setUserData
}
    return (
         <div>
        <userDataContext.Provider value={value}>
            {children}
      </userDataContext.Provider>
     </div>
  )
}

export default UserContext