import jwt from 'jsonwebtoken';
import { secret } from './secret';
 function JWT({_id, name, profile}
  : { _id: string, name: string, profile: string }
  ): string {
    
    try {
        const token = jwt.sign({_id, name, profile}, secret);
        return token;
    } catch (err) {
        console.error('Error while signing token:', err);
        return ''; // Return an empty string or handle the error as needed
    }
}

export default JWT