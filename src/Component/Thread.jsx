import React, {useState,useEffect} from 'react'
import {Heart,Repeat,Send,MessageCircle,Trash2 } from 'react-feather'
import {functions,database} from '../appwriteConfig'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'
import { useAuth } from '../context/AuthContext'

TimeAgo.addDefaultLocale(en)

function Thread({thread,setThreads}) {

    const [loading, setLoading] = useState(true)
    const [owner, setOwner] = useState(null)
    const [threadInstance,setThreadInstance] = useState(thread)

    const {user} = useAuth()

    useEffect(()=>{
        getUserInfo()
        
    },[])

    const getUserInfo = async () =>{

        const payload = {
            "owner_id":thread.owner_id
        }

        const response = await functions.createExecution(
            '64aab29648f6d2e2db1c', //Function I,
            JSON.stringify(payload)
            );

        const profile  = await database.getDocument('64aa8ecc6a139c22920c', '64b009a9d7bbf14feed4', thread.owner_id);
        console.log('Profile',profile);
        const userData = JSON.parse(response.response)
        userData['profile_pic'] = profile.profile_pic
        //console.log('GET USER REP',userData);
        setOwner(userData)
        setLoading(false)
    }

    const handleDelete = async () =>{
        database.deleteDocument(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            thread.$id
        )

        console.log('Thread was Deleted')
        setThreads(prevState =>prevState.filter( item => item.$id !==thread.$id))
    }

    const toggleLike = async ()=>{
        const users_who_liked = thread.users_who_liked
        console.log(thread.users_who_liked)
        
        if(users_who_liked.includes(user.$id)){
            const index = users_who_liked.indexOf(user.$id)
            users_who_liked.splice(index,1)
        }else{
            users_who_liked.push(user.$id)
        }

        const payload = {
            'users_who_liked':users_who_liked,
            'likes':users_who_liked.length
        }

        const response = await database.updateDocument(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            thread.$id,
            payload
        )

        setThreadInstance(response)
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
                <div className="flex justify-between gap-2 items-center cursor-pointer">
                    <p className='text-[rgba(97,97,97,1)] '>
                    <ReactTimeAgo date={new Date(thread.$createdAt).getTime() } locale="en-US"/>    
                    </p>
                    <Trash2 size={18} onClick={handleDelete}/>
                </div>
            </div>

            {/*Thread Body */}

            <div className="py-4" style={{whiteSpace:"pre-wrap"}}>
                
                    {thread.body}
                
                {thread.image && (
                    <img className='object-cover border border-[rgba(49,49,50,1)] rounded-md' src={thread.image} />
                )}
            </div>

            {/*Thread Icons */}
            <div className=" flex flex-row gap-4 py-4">
                <Heart 
                onClick={toggleLike} 
                className='cursor-pointer' 
                size={22}
                color={threadInstance.users_who_liked.includes(user.$id) ? '#ff0000' :'#fff' }
                />
                <MessageCircle size={22} /> 
                <Repeat size={22} />
                <Send size={22} />

            </div>


            <div className="flex gap-4">
                <p className='text-[rgba(97,97,97,1)]'>Replies 16</p>
                <p>.</p>
                <p className='text-[rgba(97,97,97,1)]'> {threadInstance.likes} Likes</p>
            </div>
        
    </div>
</div>


    
  )
}

export default Thread