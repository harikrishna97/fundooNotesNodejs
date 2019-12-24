const shortid = require('shortid');
const nodeMailer=require('../utility/sendMail')
const nodeMailerObject=new nodeMailer.NodeMailerClass;
const service=require('../services/user');
const dotenv = require('dotenv/config');
const serviceClassObject=new service.ServiceClass
class UrlShortnerClass{

     urlShortner(resData,longUrl,callback){

       const urlCode= shortid.generate(longUrl);
    //    const shortUrl='http://localhost:4000/userVerify/'+urlCode;
       const shortUrl=`${process.env.USER_VERIFY_URL}`+urlCode;

        // console.log('shortUrl :: ',shortUrl);
        const verifyObject={}
        verifyObject.longUrl=longUrl;
        verifyObject.shortUrl=shortUrl;
        verifyObject.urlCode=urlCode;
        // console.log('After save',resData,verifyObject);
        
        //now need to save data in database for user verification
        serviceClassObject.urlShortnerService(resData,verifyObject,(err,data)=>{
            if(err){
                console.log('Error while savaing Url in database');
                return callback(err)
                
            }else{
                nodeMailerObject.sendMailUsingNodeMailer(resData.email,shortUrl);
                console.log('Url Data save SuceesFully');
                return callback(null,data)
            }
        });

        //sendMail

     }

    // urlShortner();



}

module.exports=new UrlShortnerClass();
