
/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : fundoo-notes backend server
 * 
 *  @description    : "Routes" to forward the supported requests
 *                    (and any information encoded in request URLs) to the 
 *                     appropriate controller functions.
 * 
 *  @file              : routes.js
 *  @overview      :  "Routes" to forward the supported requests.
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 
 *
 ******************************************************************************/

const express=require('express')
const controllerClassObject=require('../controller/user')
const tokenObject=require('../utility/tokenVerification')
const model=require('../app.js/model/user')
const modelClassObject=new model.ModelClass
const routes=express.Router()

routes.post('/registration',controllerClassObject.registration);
routes.post('/login',controllerClassObject.login);
routes.get('/getAllUser',controllerClassObject.getAllUserInController);
routes.post('/forgetPassword',controllerClassObject.forgetPasswordInController);
routes.post('/resetPassword',tokenObject.tokenVerification,controllerClassObject.resetPasswordInController);


routes.get('/userVerify/:url',(req,res)=>{
    modelClassObject.findOne({"urlCode":req.params.url},(err,data)=>{
        if(err){
            return res.status(404).send('Invalid Url')
        }else if(data==null){

            return res.status(400).send('Invalid Url')
            
        }else{
            
            return res.redirect(data.longUrl)
        }
    })
})

// routes.post('/userVerification/:token',tokenObject.userVerification,controllerClassObject.userVerificatonInController);
routes.post('/userVerification/:token',tokenObject.tokenVerification,controllerClassObject.userVerificatonInController);



// http://localhost:4000/userVerification/nMkyu3H4

module.exports = routes;