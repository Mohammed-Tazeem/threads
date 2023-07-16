import React, { useEffect, useState } from 'react'
import Thread from '../Component/Thread'
import { useParams } from 'react-router-dom'
import { database} from '../appwriteConfig'

function ThreadPage() {
    const {id}  = useParams()
    const [thread, setThread] = useState(null)
    const [loading, setLoading] = useState(true)

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

    if(!loading) return

  return (
    <div className='container mx-auto max-w-[600px]'>
        <Thread thread={thread}/>
    </div>
  )
}

export default ThreadPage