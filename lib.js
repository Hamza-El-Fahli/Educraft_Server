const fs = require('fs')
const path = require('path')

const dbLocation = path.join(__dirname,('./DB/users.json'))

module.exports = class myJSON{

    constructor(props){
        this.read = this.read.bind(this)
        this.data = []
        this.read()
        
    }
    
    
    
    async read(){
        try  {
            let file = await fs.promises.readFile(dbLocation,'utf8');
            try{file = JSON.parse(file)}
            catch(e){file = []}
            this.data = file
            return file ;
        }
        catch (e){console.error(e)}
    }
    

    async write(newUser) {
        const {email , password , name} = newUser
        this.data.push({email , password , name})
        await fs.promises.writeFile(dbLocation, JSON.stringify(this.data), 'utf8'); 
    }


    async find(user){
        for(let i in this.data){
            if(this.data[i].email === user.email )
                 if(this.data[i].password === user.password ) return this.data[i].name
        }
        return 0
    }
    



}