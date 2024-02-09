const express = require('express')
const { getUsers , getCourses } = require('./DB/dbServer.js')
const app = express()

const port = 7676


app.get('/',(req,res)=>{
    res.send('Hiii to my db server')
})


app.get('/users', async(req,res)=>{
    const users = await getUsers()
    res.json(users)
})


app.get('/courses/:instructor_id?',async(req,res)=>{
    const inst_id = req.params.instructor_id
    let courses
    if (inst_id) 
        courses = await getCourses(inst_id)
    else
        courses = await getCourses()
    res.json(courses)
})


app.get('/Course/modules',(req,res)=>{

})



app.get('/Course/modules/chapters',(req,res)=>{
    res.send('Hiii to my db server')
})



app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}  `)
})