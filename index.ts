import express, { Request, Response } from 'express';
const port = process.env.PORT || 7676

const mobileApp = require('./mobile/mobile.js')
const webApp = require('./web/web.js')

const app = express()

app.use('/mobile',mobileApp)
app.use('/web',webApp)



app.get('/',(req: Request, res: Response)=>{
    res.send('Hiii to my server')
})




app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}  `)
    console.log(`Web App is running http://localhost:${port}/web  `)
    console.log(`Mobile App is running http://localhost:${port}/mobile `)
})