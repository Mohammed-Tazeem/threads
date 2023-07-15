import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Header() {

    const {user,logOutUser}  =useAuth()

    
  return (
    <div>
        {
            user ? (
                
                <div className="flex items-center justify-center gap-2 py-2">
                <img
                 src={user.profile.profile_pic}
                 className='h-10 w-10  rounded-full object-cover'/>
                <strong>Hello {user.name}</strong> 
                <button
                 className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow cursor-pointer'
                 onClick={logOutUser}
                 >
                    Logout
                </button>    
                </div>)
                :
                (
                    <Link to='/login'>
                        <button
                    className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow cursor-pointer'
                    
                    >
                        Login
                    </button>
                    </Link>
                    
                )
            
        }
    </div>
  )
}

export default Header