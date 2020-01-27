/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js
 *                      2. if nodemon installed   cmd> nodemon server.js
 *
 *  @Purpose         :  verifying token to change password of valid user
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
const jwt = require("jsonwebtoken");
require("dotenv/config");
const redis = require("redis");
const secretKey = `${process.env.SECRET_KEY}`;
const client = redis.createClient(`${process.env.REDIS_PORT}`);
const logger = require("../config/winston");
module.exports = {
  tokenVerification(req, res, next) {
    logger.info("header",req.headers)
    var token = req.headers.token || req.params.token;
   logger.info("Token In Token Verification :: "+ token)

    try {
      if (token) {
        logger.info("1111111111"+token);
        
        jwt.verify(token, secretKey, (err, data) => {
          if (err) {
            // return res.status(400).send(err);

            return res.status(400).send({
              success: false,
              message: "invalid token"
            });
          } else {
            
            req.decoded = data;
            // req.body['data'] = data
            logger.info("Encoded Token :: " +JSON.stringify(req.decoded));
            // logger.info('DECODED TOEKN ID ::',req.decoded._id);
            logger.info("DECODED TOEKN ID ::", data._id);
            const url = req.url.split("/");
            const registrationToken = req.url.split("/");
            let redisData;
            if (url.includes("resetPassword")) {
              redisData = "forgetToken" + data._id;
            } else if (url.includes("userVerification")) {
              redisData = "registrationToken" + data._id;
            } else {
              redisData = data._id;
            }
            logger.info("REdisdata :: "+redisData);
            logger.info("EQ>PARAMS TOken Verification For REDIS ::"+req.url);

            client.get(redisData, (err, reply) => {
              // reply is null when the key is missing
              logger.info("Reply from forget Token", reply);
              if (token === reply) {
                logger.info("TOKEN is same");
                logger.info("now controll goes to next..");

                next();
              } else {
                logger.info("Token is Not same");
                const result = {
                  success: false,
                  message: "invalid Url"
                };
                return res.status(400).send(result);
              }
            });
          }
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "invalid User"
        });
      }
    } catch (err) {
      logger.info(err);
      return err;
    }
  }




  // userVerification(req,res,next){
  //     logger.info("verify");

  //      var urlCode=req.params.url;
  //      logger.info('URL CODE ',urlCode);

  //      modelClassObject.findOne({'urlCode':urlCode},(err,data)=>{

  //          if(err){

  //              return res.json({
  //                  success:false,
  //                  message:'invalid address'
  //              })
  //          }else{
  //              logger.info('DATA in  UserVerifivcation And findone',data);
  //              logger.info('Data from Database :: '+data);

  //              logger.info('LongUrl is :: '+data.longUrl);

  //              const data12=data.longUrl.split('http://localhost:4000/userVerification/');

  //              const token=data12[1];
  //              logger.info('Token is ',data12);

  //              logger.info('urlCode in userVerification :: ',urlCode);

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
  //                              logger.info('Encoded url :: '+JSON.stringify(req.decoded));
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
  //                  logger.info(err);
  //                  return err

  //              }
  //          }
  //      })
  //  }
};
