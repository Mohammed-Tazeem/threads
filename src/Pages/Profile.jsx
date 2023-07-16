import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../appwriteConfig'
import { Query } from 'appwrite'
import Thread from '../Component/Thread'

function Profile() {

    const [loading, setLoading] = useState(true)
    const [threads, setThreads] = useState([])
    const {id} = useParams()
    const [userProfile, setUserProfile] = useState(null)

    useEffect(()=>{
       getThreads()
       getProfile()
       //console.log('params',params);

    },[])

    const getThreads = async () =>{

        const response = await database.listDocuments(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            [
                Query.orderDesc('$createdAt'),
                Query.equal('owner_id', id)
            ]
            )
        console.log('response',response)

        setThreads(response.documents)

    }

    const getProfile = async () =>{
        const data  = await database.getDocument('64aa8ecc6a139c22920c', '64b009a9d7bbf14feed4', id);
        console.log('data',data);
        setUserProfile(data)
        console.log('userProfile',userProfile);
        setLoading(false)
    }

    if(loading) return

  return (
    <div className='container mx-auto max-w-[600px]'>

        <div className='flex justify-between my-20'>
        <div className=' py-4' >
            <h3 className='text-4xl font-bold'>{userProfile.username}</h3>
            <p className='text-sm'>{userProfile.username}</p>
            <div 
            className='py-6 '
            >{userProfile.bio}</div>
            <div className='flex flex-row items-start gap-4'>
                <p className='text-[rgba(97,97,97,1)]'>{userProfile.follower_count}  followers</p>
                <p className='text-[rgba(97,97,97,1)]'>{userProfile.follow_count}  following</p>
            </div>
        </div>  

        <div>
            <img 
            src={userProfile.profile_pic}
            className='h-24 w-24 rounded-full object-cover'
            />
            <button className=''>
                Follow
            </button>
           
        </div>
        </div>


    <div>
        {
            threads.map(thread =>(
                <Thread key={thread.$id} thread={thread} setThreads={setThreads}/>
            ))
           

        }
    </div>
    </div>
  )
}

export default Profile