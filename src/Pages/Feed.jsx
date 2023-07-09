import React,{useState,useEffect} from 'react'

import Thread from '../Component/Thread'

import { database,DEV_DB_ID, COLLECTION_ID_THREADS } from '../appwriteConfig'

function Feed() {
    const [threads, setThreads] = useState([])

    useEffect(()=>{
        getThreads()
    },[])

    const getThreads = async () =>{

        const response = await database.listDocuments('64aa8ecc6a139c22920c','64aa8f1c21b3f520ab97')
        console.log('response',response)
        setThreads(response.documents)

    }

  return (
    <div className='container mx-auto max-w-[600px]'>
        {
            threads.map(thread =>(
                <Thread key={thread.$id} thread={thread}/>
            ))
           

        }
         

    </div>
  )
}

export default Feed