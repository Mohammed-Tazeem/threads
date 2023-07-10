import React,{useState,useEffect} from 'react'
import Thread from '../Component/Thread'
import { database,DEV_DB_ID, COLLECTION_ID_THREADS } from '../appwriteConfig'
import { Query } from 'appwrite'
import { Image, MoreHorizontal } from 'react-feather'

function Feed() {
    const [threads, setThreads] = useState([])

    const [threadbody,setThreadbody] = useState('') 

    useEffect(()=>{
        getThreads()
    },[])

    const getThreads = async () =>{

        const response = await database.listDocuments(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            [
                Query.orderDesc('$createdAt')
            ]
            )
        console.log('response',response)
        setThreads(response.documents)

    }

  return (
    <div className='container mx-auto max-w-[600px]'>

        <div className=" p-4 ">
            <form action="">
                <textarea
                
                required
                name='body'
                placeholder='Say Something...'
                value={threadbody}
                onChange={(e)=>{setThreadbody(e.target.value)}}
                className=' rounded-lg p-4 w-full bg-[rgba(28,29,29,1)]'
                >
                </textarea>
                <div className='flex justify-between items-center'>
                    <Image size={24}/>
                    <input className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow' type='submit' value='Post'/>
                </div>

                
            </form>
        </div>

        {
            threads.map(thread =>(
                <Thread key={thread.$id} thread={thread}/>
            ))
           

        }
         

    </div>
  )
}

export default Feed