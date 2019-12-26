
/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : Fundoo-Notes APP  backend server
 * 
 *  @description    :  It provides the interaction between users and your application.
 * 
 *  @file              : server.js
 *  @overview      :  Fundoo-Notes APP backend server
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 018-12-2019
 *
 ******************************************************************************/
const express=require('express');
const bodyParser=require('body-parser');
const validator = require('express-validator');
const routes=require('./routes/routes')
const dotenv = require('dotenv/config');
// var cors = require('cors');
const database=require('./config/database.service');
const DatabaseClassObject= new database.DatabaseClass;
// var winston = require('./config/winston');

const redis=require('redis')

const REDIS_PORT=`${process.env.REDIS_PORT}`||6379

const client = redis.createClient(REDIS_PORT);

//create express app

const app=express();

// app.use(cors());

//parse request of content-type -application
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(validator());
app.use('/',routes);

 var port =`${process.env.PORT}`;

//  app.get('/', function (req, res) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
//   })

//error Handler
app.use((err,req,res,next)=>{
    if(err.name=='ValidationError'){
        var valErrors=[];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
       
    }
});
  
// listen for request
app.listen(port,()=>{
    DatabaseClassObject.connect()
    console.log('Server is Listening on port '+port+' ..');
    
})

module.exports=app
