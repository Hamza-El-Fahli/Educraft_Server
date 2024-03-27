import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { UserType } from "../services/authService";



export const useCurrentUser =  ()=>{
    const [user, setUser] = useState<UserType | null>(null)
    useEffect(()=>{
        const currentUser = Cookies.get('currentUser')
        if(currentUser){
            setUser(JSON.parse(currentUser))
        }
    },[])
    return user
}