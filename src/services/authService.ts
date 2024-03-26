import axios, { AxiosInstance } from 'axios'



export interface UserType {
        username : string,
        accessToken : string,
        expiredAt? : any, 
        maxAge : any
} 


export class AuthService {
    protected readonly instance: AxiosInstance;
    public constructor (url:string){
        this.instance = axios.create({
            baseURL : url,
            timeout:3000,
            timeoutErrorMessage : 'TimeOut!'
        })
    }

    login = (identifier:string , password : string)=>{
        const loginData : {name?:string , email?:string , password:string} = {password}  // loginData should have password
        // check if user input is username or email 
        if(identifier.search('@')==-1) loginData['name'] = identifier // if Identifier was a username
        else loginData['email'] = identifier // if the identifier was an email

        return this.instance
            .post("/api/users",loginData)
            .then(async (res)=>{
                const {maxAge , name , accessToken} = res.data
                return {
                    username : name,
                    accessToken : accessToken ,
                    maxAge : maxAge,
                    expiredAt : maxAge

                }
            })
    }
}



export const authService = new AuthService('http://localhost:3000')