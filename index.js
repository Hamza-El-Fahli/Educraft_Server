const express = require('express')
const myJSON = require('./lib')
const port = 3000;


const app = express()
const users=new myJSON()
app.get('/',async (req,res)=>{
    res.send('Hiiii')
})
app.get('/allusers',async (req,res)=>{
    res.json(await users.data)
})

app.get('/adduser/:email/:password/:name',async (req,res)=>{
    const newUser = {
        name : req.params.name,
        email : req.params.email,
        password : req.params.password,
    }
    await users.write(newUser)
    res.json(newUser.name)
})

app.get('/isuser/:email/:password/',async (req,res)=>{
    const newUser = {
        email : req.params.email,
        password : req.params.password,
    }
    const result = await users.find(newUser)
    res.json(result)
})


app.listen(port,()=>{console.log(`listening at http://localhost:${port}`)})