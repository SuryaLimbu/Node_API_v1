// importing the "express" module 
const express = require('express');
// assogn the 'express' variable to  app variable
const app = express();


// Routes
// request= client send to node APP
// response =  node APP send to client
app.get('/',(req,res)=>{
    res.send('Hello API');
})
// this app satrt server  and listen on port 3000 for connection 
app.listen(3000,()=>{
    console.log(`Node api is running on port 3000`)
});