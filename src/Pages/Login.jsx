import React, {useRef} from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const loginForm  = useRef(null)

  return (
    
          <div className='container mx-auto max-w-[400px] border border-[rgba(49,49,50,1)] p-4'>
            <form ref={loginForm} className='space-y-4 md:space-y-6'>
                <div className="py-2">
                    <label className='block mb-2 text-sm font-medium text-white'>Email</label>
                    <input 
                    type="email" 
                    name='email'
                    className='w-full p-2 rounded-lg'
                    />
                </div>
                <div className="py-2">
                    <label>Password</label>
                    <input 
                    type="password" 
                    name='password'
                    required
                    className='w-full p-2 rounded-lg'
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