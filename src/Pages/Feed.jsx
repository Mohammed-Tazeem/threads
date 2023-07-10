import React,{useState,useEffect} from 'react'
import Thread from '../Component/Thread'
import { database,DEV_DB_ID, COLLECTION_ID_THREADS } from '../appwriteConfig'
import { Query,ID } from 'appwrite'
import { Image } from 'react-feather'

function Feed() {
    const [threads, setThreads] = useState([])
    const [threadbody,setThreadbody] = useState('') 
    const [threadImg, setThreadImg]  = useState(null)

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
        //console.log('response',response)
        setThreads(response.documents)

    

    }

    const handleThreadSubmit = async (e) => {
        e.preventDefault()

        const payload  = {
            "owner_id":"64aa8ff5902b755c1ee4",
            "body":threadbody,
            "image": threadImg
        }

        const response  = await database.createDocument(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            ID.unique(),
            payload
        )

        //console.log('RESPONSE',response);
        setThreads(prevState => [response, ...prevState] )
        setThreadbody('')
    }

    const handleClick = async (e)=>{

    }

  return (
    <div className='container mx-auto max-w-[600px]'>

        <div className=" p-4">
            <form onSubmit={handleThreadSubmit}>
                <textarea
                
                required
                name='body'
                placeholder='Say Something...'
                value={threadbody}
                onChange={(e)=>{setThreadbody(e.target.value)}}
                className=' rounded-lg p-4 w-full bg-[rgba(28,29,29,1)]'
                >
                </textarea>
                <div className='flex justify-between items-center border-y border-[rgba(49,49,50,1)] py-2'>
                    <Image className='cursor-pointer' size={24} onClick={handleClick}/>
                    <input className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow' type='submit' value='Post'/>
                </div>

                
            </form>
        </div>

        {
            threads.map(thread =>(
                <Thread key={thread.$id} thread={thread} setThreads={setThreads}/>
            ))
           

        }
         

    </div>
  )
}

export default Feed