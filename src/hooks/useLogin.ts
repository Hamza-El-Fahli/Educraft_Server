import { UserType, authService } from "../services/authService";
import Cookies from 'js-cookie'

export const useLogin = () =>{


    const login = async (username:string,password:string)=>{
        const user = await authService.login(username,password)
        if(user){
            Cookies.set('currentUser',JSON.stringify(user))
        }
        return user as UserType 
    }
    return { login }
}