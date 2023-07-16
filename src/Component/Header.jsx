import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Header() {

    const {user,logOutUser}  =useAuth()

    
  return (
    <div className='flex items-center justify-between py-4 px-4 '>
        <Link to='/'><strong className='text-6xl'>@</strong></Link>
        
        {
            user ? (
                
                <div className="flex items-center justify-center gap-4">

                    <Link to={`/profile/${user.profile.$username}`}>
                <img
                 src={user.profile.profile_pic}
                 className='h-10 w-10  rounded-full object-cover'/>
                 </Link>
                <strong className='text-sm'>Hello {user.name}</strong> 
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