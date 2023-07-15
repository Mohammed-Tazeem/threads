import { createContext, useContext, useEffect, useState } from 'react'
import { account,database } from '../appwriteConfig'
import { Link,useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userProfilePic, setUserProfilePic] = useState(null)

    const navigate = useNavigate()


    
    useEffect(()=>{
        getUserOnLoad()
    },[])


    const getUserOnLoad = async () =>{
        try{

            let accounDetails  =await account.get()
            console.log(accounDetails);
            setUser(accounDetails)

        }catch(error){

        }
        setLoading(false)
    }

    const loginUser = async(userInfo) =>{
        console.log('USER INFO',userInfo);

        try{
            const response  = await account.createEmailSession(userInfo.email,userInfo.password)

            const accounDetails = await account.get()
            setUser(accounDetails)
            
            //console.log(response);

        }catch(error){
            console.log(error);

        }

    }

    const logOutUser = async ()=>{
        account.deleteSession('current')
        navigate('/login')
        setUser(null)
    }

    const contextData = {
        user,
        loginUser,
        logOutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading................................</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext)}


export default AuthContext