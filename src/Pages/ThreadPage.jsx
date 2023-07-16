import React, { useEffect, useState,useRef } from 'react'
import Thread from '../Component/Thread'
import { useParams } from 'react-router-dom'
import { database} from '../appwriteConfig'
import { ID } from 'appwrite'
import { useAuth } from '../context/AuthContext'

function ThreadPage() {
    const {id}  = useParams()
    const [thread, setThread] = useState(null)
    const [loading, setLoading] = useState(true)

    const [commentBody,setCommentBody] = useState('')

    const {user} = useAuth()

    useEffect(()=>{
        getThread()

    },[])

    const getThread =  async () =>{
        const response = await database.getDocument(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
             id)
        setThread(response)
        setLoading(false)
    }
    const handleThreadSubmit = async (e) => {
        e.preventDefault()

       
    }

    const handleCommentSubmit =async(e) =>{
        e.preventDefault()

        const payload  = {
            "owner_id":user.$id,
            "thread_id":id,
            "body":commentBody,
        }

        const response  = await database.createDocument(
            '64aa8ecc6a139c22920c',
            '64b400ce55e2c5ff8c9e',
            ID.unique(),
            payload
        )

        //console.log('RESPONSE',response);
        //setThreads(prevState => [response, ...prevState] )
        setCommentBody('')
        
    }

    if(!loading) return

  return (
    <div className='container mx-auto max-w-[600px]'>
        <Thread thread={thread}/>
        <div className=" p-4">
            <form onSubmit={handleCommentSubmit}>
                <textarea
                
                required
                name='body'
                placeholder='Say Something...'
                value={commentBody}
                onChange={(e)=>{setCommentBody(e.target.value)}}
                className=' rounded-lg p-4 w-full bg-[rgba(28,29,29,1)]'
                >
                </textarea>
                
                
                <div className='flex justify-end items-center border-y border-[rgba(49,49,50,1)] py-2 '>
                    <input className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow cursor-pointer' type='submit' value='Post'/>
                </div>

                
            </form>
        </div>
    </div>
  )
}

export default ThreadPage