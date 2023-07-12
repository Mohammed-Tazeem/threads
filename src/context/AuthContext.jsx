import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    
    useEffect(()=>{
        setLoading(false)
    },[])

    const loginUser = async(userInfo) =>{
        console.log('USER INFO',userInfo);

    }

    const contextData = {
        user,
        loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading................................</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext)}


export default AuthContext