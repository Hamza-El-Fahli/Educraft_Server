const express = require('express')
const { getUsers , getCourses } = require('../DB/dbServer.js')

mobileApp = express.Router()



mobileApp.get('/',(req,res)=>{
    res.send('Hiii to my Mobile app server')
})

mobileApp.get('/users', async(req,res)=>{
    const users = await getUsers()
    res.json(users)
})


mobileApp.get('/courses/:instructor_id?',async(req,res)=>{
    const inst_id = req.params.instructor_id
    let courses
    if (inst_id) 
        courses = await getCourses(inst_id)
    else
        courses = await getCourses()
    res.json(courses)
})


mobileApp.get('/Course/modules',(req,res)=>{

})



mobileApp.get('/Course/modules/chapters',(req,res)=>{
    res.send('Hiii to my db server')
})


module.exports = mobileApp