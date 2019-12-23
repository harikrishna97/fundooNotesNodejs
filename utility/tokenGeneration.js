
/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : generating token to verify user
 * 
 *  @description    : generating token to verify user
 * 
 *  @file              : tokenGeneration.js
 *  @overview      :  generating token to verify user
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 04-12-2019
 *
 ******************************************************************************/

const jwt=require('jsonwebtoken')

var secretKey='$@#hari&krishna#@$';

module.exports={
    
    tokenGeneration(payload){
        try{
                console.log("pay---->",payload);
                
            var token=jwt.sign(payload,secretKey,{expiresIn:'1d'});
            return token;

        }catch(err){
            console.log(err);
            return err;
            
        }

        


    }

}
 