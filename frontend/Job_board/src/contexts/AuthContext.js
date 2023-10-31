import { createContext } from "react"

 const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (auth)=>{
    },
    user: null,
    setUser: (userData)=>{
    }
    }
)
export default AuthContext