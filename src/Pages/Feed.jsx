import React,{useState,useEffect,useRef} from 'react'
import Thread from '../Component/Thread'
import { database,DEV_DB_ID, COLLECTION_ID_THREADS,storage } from '../appwriteConfig'
import { Query,ID } from 'appwrite'
import { Image } from 'react-feather'
import { useAuth } from '../context/AuthContext'

function Feed() {
    const [threads, setThreads] = useState([])
    const [threadbody,setThreadbody] = useState('') 
    const [threadImg, setThreadImg]  = useState(null)

    const {user} = useAuth()

    const fileRef = useRef(null)

    useEffect(()=>{
        getThreads()
    },[])

    const getThreads = async () =>{

        const following  =user.profile.following

        let feedposts = []

        for(let i=0; following.length > i; i++){
            let response = await database.listDocuments(
                '64aa8ecc6a139c22920c',
                '64aa8f1c21b3f520ab97',
                [
                    Query.orderDesc('$createdAt'),
                    Query.equal('owner_id',following[i]),
                    Query.limit(1)
                ]
                )
            
            feedposts = [...feedposts,...response.documents]
            
        }
        // Add Our Own Post
        let response = await database.listDocuments(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            [
                Query.orderDesc('$createdAt'),
                Query.equal('owner_id',user.$id),
                Query.limit(1)
            ]
            )
        feedposts = [...feedposts,...response.documents]
        console.log('feedposts',feedposts)
        setThreads(feedposts) 

       /* const response = await database.listDocuments(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            [
                Query.orderDesc('$createdAt')
            ]
            )
        //console.log('response',response)*/
        

    }

    const handleThreadSubmit = async (e) => {
        e.preventDefault()

        const payload  = {
            "owner_id":user.$id,
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
        setThreadImg(null)
    }

    const handleClick = async (e)=>{
        fileRef.current.click()

    }

    const handleFileChange = async (e) =>{
        const fileObj  = e.target.files && e.target.files[0];
        //console.log('fileObj',fileObj);

        if (!fileObj){
            return
        }

        const response = await storage.createFile(
            '64ac1b91e9afb70b93d1',
             ID.unique(),
             fileObj
              );

        //console.log('Upload Successfull',promise)

        const imagePreview = storage.getFilePreview('64ac1b91e9afb70b93d1', response.$id);
        setThreadImg(imagePreview.href)
        
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
                <img src={threadImg} />
                <input
                 type='file'
                 ref={fileRef}
                 style={{display:"none"}}
                 onChange={handleFileChange}
                 />
                <div className='flex justify-between items-center border-y border-[rgba(49,49,50,1)] py-2 '>
                    <Image className='cursor-pointer' size={24} onClick={handleClick}/>
                    <input className='bg-white text-black text-sm font-bold py-2 px-4 rounded border border-gray-300 shadow cursor-pointer' type='submit' value='Post'/>
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