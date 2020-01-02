/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         :  verifying token to change password of valid user
 * 
 *  @description    : verifying token to change password of valid user
 * 
 *  @file              : tokenGeneration.js
 *  @overview      :   verifying token to change password of valid user
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 04-12-2019
 *
 ******************************************************************************/
const jwt=require('jsonwebtoken')
require('dotenv/config')
const model=require('../app.js/model/user')
// const modelClassObject=new model.ModelClass;
const redis=require('redis')
var secretKey=`${process.env.SECRET_KEY}`;
// console.log('SECRETKey,',secretKey );
const client = redis.createClient(`${process.env.REDIS_PORT}`);

module.exports={

    
    tokenVerification(req,res,next){
       
        var token=req.params.token||req.headers.token;
        console.log('Token In Token Verification :: ',req.params.token);
        
        try{
            if(token){
                jwt.verify(token,secretKey,(err,data)=>{
                    if(err){

                        return res.json({
                            success:false,
                            message:'invalid token'
                        })
                    }else{
                        req.decoded=data
                        // req.body['data'] = data
                        console.log('Encoded Token :: '+JSON.stringify(req.decoded));
                        // console.log('DECODED TOEKN ID ::',req.decoded._id);
                        console.log('DECODED TOEKN ID ::',data._id);

                        const forgetToken=req.url.split('/').includes('resetPassword')
                        const registrationToken=req.url.split('/').includes('userVerification')
                        let redisData;
                        if(forgetToken==true){
                            redisData="forgetToken"+data._id;
                        }else if(registrationToken==true){
                            redisData="registrationToken"+data._id;
                        }else {
                            redisData=data._id;

                        }
                        console.log('REdisdata :: ',redisData);                        
                        console.log('EQ>PARAMS TOken Verification For REDIS ::',req.url);
                        
                        client.get(redisData, (err, reply)=>{
                            // reply is null when the key is missing
                            console.log('Reply from forget Token',reply);
                            if(token===reply){
                                console.log('TOKEN is same');
                                next()
                            }else{
                                console.log('Token is Not same');
                                return res.status(401).send( res.json({
                                    success:false,
                                    message:'invalid Url'
                                }))       
                            }
                        }) 
                    }
                })
            }else if(token == null || token == undefined){

                return res.status(501).send( res.json({
                    success:false,
                    message:'invalid User'
                }))
            }
        }catch(err){
            console.log(err);
            return err
        }
    },
    // userVerification(req,res,next){
    //     console.log("verify");
        
    //      var urlCode=req.params.url;
    //      console.log('URL CODE ',urlCode);
         
    //      modelClassObject.findOne({'urlCode':urlCode},(err,data)=>{
 
    //          if(err){
 
    //              return res.json({
    //                  success:false,
    //                  message:'invalid address'
    //              })
    //          }else{
    //              console.log('DATA in  UserVerifivcation And findone',data);
    //              console.log('Data from Database :: '+data);
                 
    //              console.log('LongUrl is :: '+data.longUrl);
 
    //              const data12=data.longUrl.split('http://localhost:4000/userVerification/');
 
    //              const token=data12[1];
    //              console.log('Token is ',data12);
                 
                 
    //              console.log('urlCode in userVerification :: ',urlCode);
                 
    //              // model ka find method call backend data-long url
    //              //split long url and find tokrn
    //              try{
    //                  if(token){
    //                      jwt.verify(token,secretKey,(err,data)=>{
    //                          if(err){
 
    //                              return res.json({
    //                                  success:false,
    //                                  message:'invalid token'
    //                              })
    //                          }else{
    //                              req.decoded=data
    //                              // req.body['data'] = data
    //                              console.log('Encoded url :: '+JSON.stringify(req.decoded));
    //                              next()
    //                          }
    //                      })
    //                  }else if(token == null){
 
    //                      res.json({
    //                          success:false,
    //                          message:'invalid User'
    //                      })
 
    //                      return res.status(501).send(res)
    //                  }
 
    //              }catch(err){
    //                  console.log(err);
    //                  return err
                     
    //              }
    //          }
    //      })
    //  }
}
    