import React,{useState,useEffect} from 'react'

import Thread from '../Component/Thread'

import { database,DEV_DB_ID, COLLECTION_ID_THREADS } from '../appwriteConfig'

function Feed() {
    const [threads, setThreads] = useState()

    useEffect(()=>{
        getThreads()
    },[])

    const getThreads = async () =>{

        const response = await database.listDocuments(DEV_DB_ID,)

    }

  return (
    <div className='container mx-auto max-w-[600px]'>
        <Thread/>
        <Thread/>
        <Thread/>
        <Thread/>

    </div>
  )
}

export default Feed