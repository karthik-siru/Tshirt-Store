const express = require("express");

const app = express();

const port = 8001 ;

app.get("/"  , (req , res )=> {
    return  res.send("hello mowa ") ;
});

app.get("/login"  , (req , res )=> {
    return  res.send("This is a login page  ") ;
});

app.listen(port , () => {
    console.log("server is up and running  ... ");
});