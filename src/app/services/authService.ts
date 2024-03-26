import axios, { AxiosInstance } from 'axios'

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
            .then((res)=>{
                return {
                    username : res.data.username,
                    accessToken : res.data.access_token,
                    expiredAt : res.data.expiredAt
                }
            })
    }
}
