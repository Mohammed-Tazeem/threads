import React, {useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
    const loginForm  = useRef(null)

    const {loginUser,user} = useAuth()

    const navigate  =useNavigate()

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])

    const handleSubmit =(e) =>{
        e.preventDefault()

        const email  = loginForm.current.email.value
        const password  = loginForm.current.password.value


        loginUser({email,password})
    } 

  return (
    
          <div className='container mx-auto max-w-[400px] border border-[rgba(49,49,50,1)] p-4 rounded-md m-4'>
            <form onSubmit={handleSubmit} ref={loginForm} className='space-y-4 md:space-y-6'>
                <div className="py-2">
                    <label className='block mb-2 text-sm font-medium text-white '>Email</label>
                    <input 
                    type="email" 
                    name='email'
                    className='w-full p-2 rounded-lg bg-slate-800'
                    />
                </div>
                <div className="py-2">
                    <label>Password</label>
                    <input 
                    type="password" 
                    name='password'
                    required
                    className='w-full p-2 rounded-lg bg-slate-800'
                    />
                </div>
                <div className="py-2">
                    
                    <input 
                    type="submit" 
                    name='Login'
                    className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow cursor-pointer'
                    />
                </div>
            </form>
            <p >Don't have account, Go to <Link to='/register' className='text-purple-600'>Register</Link></p>
          </div>
      
  )
}

export default Login