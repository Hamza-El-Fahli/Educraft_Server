const express = require('express')

const webApp = express.Router()


webApp.get('/',(req,res)=>{
    res.send('Hiii to my Web app server')
})


module.exports = webApp