import React from 'react'
import { useAuth } from '../context/AuthContext'

function Header() {

    const {user,logOutUser}  =useAuth()
  return (
    <div className='text-lg text-center'>
        {
            user ? (
                <div className="">
                <strong>Hello {user.name}</strong>     
                </div>)
                :
                (
                    <button
                    className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow cursor-pointer'
                    >
                        Login
                    </button>
                )
            
        }
    </div>
  )
}

export default Header