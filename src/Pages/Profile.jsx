import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../appwriteConfig'
import { Query } from 'appwrite'
import Thread from '../Component/Thread'
import { useAuth } from '../context/AuthContext'

function Profile() {

    const {user} = useAuth()
    const [loading, setLoading] = useState(true)
    const [threads, setThreads] = useState([])
    const {username} = useParams()
    const [userProfile, setUserProfile] = useState(null)

    useEffect(()=>{
       getProfile()
       //getThreads()
       
       //console.log('params',params);

    },[])

    const getThreads = async (owner_id) =>{

        const response = await database.listDocuments(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            [
                Query.orderDesc('$createdAt'),
                Query.equal('owner_id', owner_id)
            ]
            )
        console.log('response',response)

        setThreads(response.documents)

    }

    const getProfile = async () =>{
        const data  = await database.listDocuments(
            '64aa8ecc6a139c22920c',
             '64b009a9d7bbf14feed4',
        [
        Query.equal('username',username),
        Query.limit(1)
        ]
        );
        console.log('data',data.documents[0]);
        getThreads(data.documents[0].$id)
        setUserProfile(data.documents[0])
       // console.log('userProfile',userProfile);
        setLoading(false)
    }

    const toggleFollow = async () =>{
        console.log('Follow Toggled');
        const following = user.profile.following
        const followers = userProfile.followers

        if(following.includes(userProfile.$id)){
            const index = following.indexOf(userProfile.$id)
            following.splice(index,1)
        }else{
            following.push(userProfile.$id)
        }

        if(followers.includes(user.$id)){
            const index = followers.indexOf(user.$id)
            followers.splice(index,1)
        }else{
            followers.push(user.$id)
        }



        // Update Both Users
        const payload1 = {
            'following':following,
            //'follow_count':following.length
        }

        const payload2 = {
            'followers':followers,
            'follower_count':followers.length
        }

        const response1 = await database.updateDocument(
            '64aa8ecc6a139c22920c',
            '64b009a9d7bbf14feed4',
            user.$id,
            payload1
        )

        console.log('response1',response1);

        const response2 = await database.updateDocument(
            '64aa8ecc6a139c22920c',
            '64b009a9d7bbf14feed4',
            userProfile.$id,
            payload2
        )

        console.log('response2',response2);
        console.log('payload1',payload1);

        setUserProfile(response2)
        

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

        <div className='flex flex-col justify-between '>
            <img 
            src={userProfile.profile_pic}
            className='h-24 w-24 rounded-full object-cover'
            />

            {user.profile.following.includes(userProfile.$id) ? 
            (<button
                onClick={toggleFollow}
                className='bg-white text-black text-sm font-bold py-2 px-4 my-1  rounded-full border border-gray-300 shadow cursor-pointer'>
                    Following
                </button>) :
            (<button
                onClick={toggleFollow}
                className=' text-white text-sm font-bold py-2 px-4 my-1  rounded-full border border-white shadow cursor-pointer'>
                    Follow
                </button>)
            }
            

            
           
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