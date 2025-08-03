import React, { useContext, useState } from 'react'
import smallLogo from "../assets/smallLogo.svg"
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";

import download from "../assets/download.png"
import { userDataContext } from '../context/userContext';
import { authData } from '../context/Authcontext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Navbar() {

    let { userData, setUserData } = useContext(userDataContext);

    let { serverUrl } = useContext(authData);
    let [showPop, setShowPop] = useState(false);
    let navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/auth/logout", {
                withCredentials:true
            })
            setUserData(null)
              navigate("/login")
            console.log(result)
          
         }
        catch (error)
        {
          console.log(error)
        }
  }


  return (
      <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex  justify-around items-center '>
          <div className='flex justify-center items-center gap-[10px]'>
          <div className='px-[15px] py-[15px]'>
               <img src={smallLogo}  width="40" alt="" />
          </div>

          <form className='w-[300px] h-[40px] bg-[#eeece2] flex items-center gap-[10px] px-[10px] py-[10px] rounded-md'  action="">
              <div>
<IoSearch className='w-[25px] h-[20px] bg-gray-200 text-gary-600' />
              </div>

                  <input type="text" className='w-[80%] h-full bg-transparent  outline-none border-0  ' placeholder='Search Users....'   />
              </form>
          </div>


 <div className='flex justify-center items-center gap-[20px] relative'>

{showPop&& 
              <div className='w-[300px] min-h-[300px] bg-white shadow-lg absolute rounded-lg top-[72px] flex flex-col items-center p-[20px] gap-[20px]'>
              <div className='w-[80px] h-[70px] rounded-full overflow-hidden'>
                  <img src={download} className="w-full h-full" alt="" /></div>
                  <div className='text-[19px] font-semi-bold text-gray-700'>{`${userData.firstName} ${userData.lastName}`}</div>
                  <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]'>view profile</button>
                   <div className='w-full h-[1px] bg-gray-700'></div>
                  <div className='flex  items-center justify-center '><MdOutlinePeopleAlt className='w-[23px] h-[23px] text-gray-600 pr-[2px]' /><div>MyNetwork</div>
                      
                  </div>
                   <button className='w-[100%] h-[40px] rounded-full border-2 border-[#b20a0a] text-[#b20a0a]' onClick={handleSignOut}>Sign Out</button>
              </div>
              
              }
         
              



              <div className='flex flex-col items-center justify-center'><FaHome />
              <div>Home</div></div>
              <div className='flex flex-col items-center justify-center'><MdOutlinePeopleAlt /><div>MyNetwork</div></div>
              <div className='flex flex-col items-center justify-center'><IoNotifications /><div>Notifications</div></div>

              <div className='w-[50px] h-[50px] rounded-full overflow-hidden' onClick={() => {
                  setShowPop(prev=>!prev)
              }}>
                  <img src={download} alt="" />
              </div>
              </div>
          
         
    </div>
  )
}

export default Navbar