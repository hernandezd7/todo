const express = require('express');
const routes = require('./routes');
const database = require ('./db');
require('dotenv').config()


const db = require("./models");

const port =  process.env.Port || 3000 ;

// starting up
const app = express();

// adding content to our Request
app.use( (req,res , next ) =>{
    req.context = { db: database }
    next(); 
} )


// routing manager
app.use(routes);

// setting template engine
app.set("view engine","ejs");


// use middle ware to serve static files
app.use(express.static('./public'));

db.sequelize.sync().then(function(){
    app.listen(port, function(err){
        if (err)
            console.log(err)
        console.log('Server is live on port : ' + port)
     })

});


