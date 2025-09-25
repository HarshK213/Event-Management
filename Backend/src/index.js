import dotenv from 'dotenv'
dotenv.config({
    path : './.env'
})

import DBConnect from './db/db.js'
import app from './app.js'
import seed from './seed.js'

DBConnect()
    .then(()=>{
    const port = process.env.PORT || 3000;

    app.on("error", (error)=>{
        console.log("ERR -> ",error);
        throw error;
    })

    app.listen(port, ()=>{
        console.log(`this server is running on port : ${port}`)
        seed();
    })
    })
    .catch((error)=>{
    console.log(`mongoDB connection error : ${error}`)
    })
