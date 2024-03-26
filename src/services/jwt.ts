import jwt from 'jsonwebtoken';
import { secret } from './secret';


export default function JWT ({_id ,name , profile}:{_id:string ,name:string , profile:string}){
  try {
   
    // Create the JWT token
    const token = jwt.sign({ _id  , name , profile }, secret);
    return token
  }catch(err){

  }
}