import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../appwriteConfig'
import { Query } from 'appwrite'

function Profile() {

    const [threads, setThreads] = useState([])
    const params = useParams()

    useEffect(()=>{
       // getThreads()
       console.log('params',params);

    },[])

    /*const getThreads = async () =>{

        const response = await database.listDocuments(
            '64aa8ecc6a139c22920c',
            '64aa8f1c21b3f520ab97',
            [
                Query.orderDesc('$createdAt'),
                Query.equal('owner_id', 'Avatar')
            ]
            )
        console.log('response',response)
        setThreads(response.documents)

    }*/

  return (
    <div>Profile</div>
  )
}

export default Profile