import React, {useState,useEffect} from 'react'
import { MoreHorizontal,Heart,Repeat,Send,MessageCircle } from 'react-feather'
import {functions} from '../appwriteConfig'


function Thread({thread}) {

    const [loading, setLoading] = useState(true)
    const [owner, setOwner] = useState(null)

    useEffect(()=>{
        getUserInfo()
        
    },[])

    const getUserInfo = async () =>{

        const payload = {
            "owner_id":thread.owner_id
        }

        const response = await functions.createExecution(
            '64aab29648f6d2e2db1c',
            JSON.stringify(payload)
            )
        const userData = JSON.parse(response.response)
        console.log('GET USER REP',userData);
        setOwner(userData)
        setLoading(false)
    }

    if(loading) return

  return (
    <div className='flex p-4'>
    <img 
        className='w-10 h-10 rounded-full object-fill'
        src={owner.profile_pic}
        alt='Profile Pic'
    />

    
    <div className="w-full  border-b border-[rgba(97,97,97,1)] px-2 pb-4">
            {/*Thread Header */}
            <div className=" flex justify-between gap-2 w-full ">
                <strong>{owner.name}</strong>
                <div className="flex justify-between gap-2">
                    <p className='text-[rgba(97,97,97,1)]'>{thread.$createdAt}</p>
                    <MoreHorizontal/>
                </div>
            </div>

            {/*Thread Body */}

            <div className="py-4">
                <span>
                    {thread.body}
                </span>
            </div>

            {/*Thread Icons */}
            <div className=" flex flex-row gap-4 py-4">
                <Heart size={22}/>
                <MessageCircle size={22} />
                <Repeat size={22} />
                <Send size={22} />

            </div>


            <div className="flex gap-4">
                <p className='text-[rgba(97,97,97,1)]'>Replies 16</p>
                <p>.</p>
                <p className='text-[rgba(97,97,97,1)]'> 87 Likes</p>
            </div>
        
    </div>
</div>


    
  )
}

export default Thread