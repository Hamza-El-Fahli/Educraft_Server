import axios, { AxiosInstance } from 'axios'



export interface UserType {
    _id:string;
        name : string,
        accessToken : string,
        expiredAt? : any, 
        maxAge : any,
        profile:string
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
                const {maxAge , name , accessToken,_id,profile} = res.data
                // console.log(res.data.accessToken)

                return {
                    _id ,
                    name,
                    accessToken : accessToken ,
                    maxAge : maxAge,
                    expiredAt : maxAge,
                    profile

                }
            })
    }
}



export const authService = new AuthService('http://localhost:3000')