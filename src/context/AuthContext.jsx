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

            let accountDetails  =await account.get();
            
            const profile  = await database.getDocument('64aa8ecc6a139c22920c', '64b009a9d7bbf14feed4', accountDetails.$id);
            //console.log('Profile',profile);

            accountDetails['profile'] = profile
            //console.log(accountDetails);

            
            setUser(accountDetails)

        }catch(error){

        }
        setLoading(false)
    }

    const loginUser = async(userInfo) =>{
        console.log('USER INFO',userInfo);

        try{
            const response  = await account.createEmailSession(userInfo.email,userInfo.password)

            const accountDetails = await account.get()
            setUser(accountDetails)
            
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