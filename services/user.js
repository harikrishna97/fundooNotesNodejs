/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : Fundoo-Notes APP backend server
 * 
 *  @description    : The service layer contains business logic.
 *                    In particular, it contains validation logic 

 * 
 *  @file              : user.service.js
 *  @overview      :  The service layer contains business logic.
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 18-12-2019
 *
 ******************************************************************************/

const model=require('../app.js/model/user')
const bcrypt = require('bcryptjs');
// const userObject=require('../app.js/model/user')
const modelClassObject=new model.ModelClass
const utilityClassObject=require('../utility/commonUtility')
class ServiceClass{

    
    /**
     * @description:registration API to create new User or register user 
     * @param {*} registrationData 
     * @param {*} callback 
     */
    userRegistration(registrationData,callback){
        try{
            const findData={"email":registrationData.email}
            // findData.email=registrationData.email;
            modelClassObject.findOne(findData,(err,data)=>{
                console.log('Data In ServiceClass :: '+data);
                if(data){
                    console.log('Error in Service :: '+data);       
                    return callback("Email Already Registered",null);
                }else if(data===null){
                    console.log('Data in Service :: '+data);
                    modelClassObject.createUser(registrationData,(err,data)=>{

                        if(err){
                            console.log('Error in services :: '+err);
                                    
                            return callback(err,null)
                        }else{
                            console.log('Data after save :: '+data);
                            return callback(null,data);            
                        }
                    })     
                }
            })
        }catch(err){
            console.log(err);
            return err;    
        }    
    }

    /**
     * @description:login API to login user 
     * @param {*} loginData 
     * @param {*} callback 
     */
    userLogin(loginData,callback){
        try{

            // const dataObject={}
            // dataObject.email=loginData.email;
            // dataObject.password=loginData.password;
            modelClassObject.findOne({'email':loginData.email},(err,data)=>{
                if(data==null){
                    return callback({message:'invalid email'},null)
                }
                else if(err){
                    console.log('Error :: Service :: '+err);
                    return callback(err,null)
                    
                }else {
                
                        console.log('Data in Services is :: '+data);
                    if(data.isVerified==false){
                        return callback('Please Verify Your Email Before Login',null)

                    }else{
                        bcrypt.compare(loginData.password,data.password,(err,res)=>{

                            if(res){

                                console.log('Result from service class is :: '+res);
                                
                                return callback(null,data)
                            }else{
                                console.log('Error From service Class :: '+res);
                                
                                return callback('Invalid Password',null)
                            }

                        })
                    }    

                }
            })
        }catch(err){
            console.log(err);
            return err;   
        }    
    }
   
    
    /**
     * @description:API to for forget password
     * @param {*} forgetPasswordData 
     * @param {*} callback 
     */
     forgetPasswordInService(forgetPasswordData,callback){
        try{
            console.log('Email From Forget Pass :: in Service:: '+forgetPasswordData.email);
             console.log('forget Password email :: '+forgetPasswordData.email);
             
              modelClassObject.findOne({'email':forgetPasswordData.email},(err,data)=>{
                if(err){

                    return callback(err,null)


                }else if(data==null){
                    console.log("ERROR in Service :: "+data);
                    
                    return callback('Invalid Email',null);
                }else{
                    console.log('Data in service :: '+data);
                    // console.log('Data.password'+data.password);
                    
                    return callback(null,data)
                }                      
             });                
        }catch(err){
            console.log(err);
            return err
        }     
    } 
    
    /**
     * @description:API for users reset password
     * @param {*} resetPasswordData 
     */
    resetPasswordInService(resetPasswordData){

        try{
            return new Promise((resolve,reject)=>{
                modelClassObject.updateData({'_id':resetPasswordData._id},
            {$set:{'password':utilityClassObject.hashFunction(resetPasswordData.password)}})
                .then(data=>{
                    console.log('DATa in sesetPass',data);
                    
                    resolve(data);
                })
                .catch(err=>{
                    console.log('ERR in Reset Pass ',err);
                    
                    reject(err);
                });
            });
        }catch(err){

            console.log(err);
            return err;
            
        }
    }

    /**
     * @description:function to save longUrl,shortUrl,urlCode in databse
     * @param {*} resData 
     * @param {*} verifyObject 
     * @param {*} callback 
     */
    urlShortnerService(resData,verifyObject,callback){
            console.log(' urlshortner Data',resData);            
            const dataObject= {'email':resData.email}
            modelClassObject.findOne(dataObject,(err,data)=>{

            if(err){
                return callback(err,null)
            }
            else if(data!=null){
                // const dataObjectId={'_id':resData._id};
                 modelClassObject.updateData({'email':resData.email},
                 {'longUrl':verifyObject.longUrl,
                 'shortUrl':verifyObject.shortUrl,
                 'urlCode':verifyObject.urlCode})                                               
                .then(data=>{

                    callback(null,data)
                })
                .catch(err=>{
                    console.log('in err');                
                    callback(err)  
                })
                }
            
            })
    }
    /**
     * @description:API to verify user
     * @param {*} userVerificationData 
     */
    userVerificationInService(userVerificationData){
        
            return new Promise((resolve,reject)=>{
                modelClassObject.updateData({'_id':userVerificationData._id},{$set:{'isVerified':true}})
                .then(data=>{
                    console.log('DATa in userverifivcation in service',data);
                    
                    resolve(data);
                })
                .catch(err=>{
                    console.log('ERR in userverifivcation in service ',err);                    
                    reject(err);
                });
            });
        
    }

    /**
     * description : It saves aws generator image in database for user Profile
     * @param {*} imageData 
     */
    imageUpload(imageData){
        return new Promise((resolve,reject)=>{

            modelClassObject.updateData({'_id':imageData.userId},{'imageUrl':imageData.imageUrl})
            .then(data=>{
                if(data!==null){
                    resolve(data)
                }else{
                    reject('Invalid Id')
                } 
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}
module.exports={
    ServiceClass
}