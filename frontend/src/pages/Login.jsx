import React, { useContext } from 'react'
import { useState } from 'react'
import logo from "../assets/logo.svg"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { authData } from '../context/Authcontext'
import { userDataContext } from '../context/Usercontext'


function Login() {
    const [show, setShow] = useState(false)
    let { serverUrl } = useContext(authData);
    let navigate = useNavigate();
    let { userData, setUserData }=useContext(userDataContext)
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [err,setError]=useState("")
   
    const handleSignIn = async (e) => {
        //prevents page refresh
       e.preventDefault();
        setLoading(true)
        try {
            let result = await axios.post(serverUrl + "/api/auth/login", {
                
                email,
                password
               
            }, { withCredentials: true }) 
            console.log(result)
            setUserData(result.data)
                navigate("/")
              setError("");
            setLoading(false)
    
            setEmail("");
          setPassword("");
        
           
           
        }
        catch (error) {
            setError(error.response.data.message)
            setLoading(false)
           
        }
    }
  return (
      <div className='w-full h-screen bg-gray-200 flex flex-col items-center justify-start'>
          <div className='p-30px p-lg:35px w-full  h-[70px]  flex items-center px-[20px]  py-[60px]'>
              <img src={logo} alt="" />
          </div>
          <form className='bg-gray-300  w-[100%] max-w-[400px] h-[500px] md:shadow-xl flex flex-col justify-center gap-[15px]  px-[15px] rounded-lg'  onSubmit={handleSignIn}>

              <h1 className='text-gray-800 text-[30px] font-semi-bold  mb-[20px]'>Sign In</h1>
            
              <input type="email" placeholder='email' value={email} className='w-100%  h-50px border-2 border-gray-600 text-gray-800 text-18px  px-[15px] py-[9px]  rounded-md'  onChange={(e) => {
                     setEmail(e.target.value)
                  
              }} required />
              <div className='w-100%  h-50px border-2 border-gray-600 text-gray-800 text-18px  rounded-md relative' >
                  <input type={show?"text":"password"} placeholder='password' value={password} className='w-full  h-full border-none border-gray-600 text-gray-800 text-18px px-[15px] py-[9px] rounded-md'  onChange={(e) => {
                      setPassword(e.target.value)
                  
              }} required />
                  <span className='absolute right-[20px] top-[8px] text-blue-600' onClick={() => {

                      setShow(prev=>!prev)
                  }}>{show?"hidden":"show"}</span>
              </div>
             
              {err && <p className='text-red-600 text-center'>*{err}</p>}
              <button className='w-full h-[40px] bg-gray-800 text-stone-50 rounded-md' disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
              <p className='text-center cursor-pointer'>
                  want to create a new account ?  <span className='text-blue-600' onClick={() => {
                      navigate("/signup")
                  }}  >Sign up</span>
              </p>
          </form>

    </div>
  )
}

export default Login;
