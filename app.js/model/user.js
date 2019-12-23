/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : Fundoo-Notes APP  backend server
 * 
 *  @description    : Model represents domain specific data and business
 *                    logic in MVC architecture. It maintains the data of the
 *                    application. Model objects retrieve and store model state 
 *                    in the persistance store like a database. Model class holds
 *                    data in public properties. 
 *  @file              : user.js
 *  @overview      :  Model objects retrieve and store model state 
 *                    in the persistance store like a database.
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.3.0 
 *  @since           : 18-12-2019
 *
 ******************************************************************************/
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');

var UserSchema=new mongoose.Schema(
{
    firstName:{
        type:String,
        required:'First Name can\'t be Empty',
        trim:true
    },
    lastName:{
        type:String,
        required:'Last Name can\'t be Empty',
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:'Email can\'t be Empty',
        trim:true
    },
    password:{
        type:String,
        required:'Password Name can\'t be Empty',
        minlength:[6,'Password Must be atleast 6 Characters Long']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    longUrl:{
        type:String,
        default:null
    },
    shortUrl:{
        type:String,
        default:null
    },
    urlCode:{
        type:String,
        default:null
    },
    saltSecret:String,
},
{timestamps:true});

/**@desription email validation*/
UserSchema.path('email').validate((val)=>{
    emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);

},'Invalid email!');
 
/**@description Event Handling for save operation */
UserSchema.pre('save',function (next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });

});
var user=mongoose.model('User',UserSchema);
class ModelClass{     
     /**
     * @description:function get All Users information 
     * @param:no params
     * @returns:{*} data or err
     */ 
    findAll(){
       return new Promise((reject,resolve)=>{
            user.find({}).then(data=>{
                console.log("in found DAta",data);
                
                resolve(data);

            })
            .catch(err=>{
                reject(err)
            })
        })       
    }
     /**
      * @description: findOne() method returns only one document that satisfies 
      *               the criteria entered. If the criteria entered matches for more 
      *               than one document, the method returns only one document according
      *               to natural ordering,which reflects the order in which the documents
      *               are stored in the database.
      * @param {*} findData 
      * @param {*} callback
      * @returns:{*} callback
      */
    findOne(findData,callback){

        user.findOne(findData,(err,data)=>{
            if(err){
                console.log('ERROR in findOne :: '+err);                
                return callback(err,null)
            }else{
                console.log('Data in findOne :: '+data);
            return callback(null,data);
            }
        });
    }
    /**
     * @description updateData contains mengodb's findOneAndUpdate() method,
     *              findOneAndUpdate() updates the first matching document in 
     *              the collection that matches the filter . The sort parameter
     *              can be used to influence which document is updated.
     * @param {*} updateData 
     * @param {*} dataToBeUpadted 
     */
    updateData(updateData,dataToBeUpadted){
        console.log("===>",updateData);    
        return new Promise((resolve,reject)=>{
            user.findOneAndUpdate(updateData,dataToBeUpadted,{ new: true,
                upsert: true })
            .then(data=>{
                console.log('in data');
                
                resolve(data);
            })
            .catch(err=>{
                console.log('in err',err);
                
                reject(err)
            })

        })
    }
    /**
     * @description createUser method create new user in mongodb and save new user's
     *              data in database
     * @param {*} createData 
     * @param {*} callback 
     */
    createUser(createData,callback){
        let userData=new user(
            {
                firstName:createData.firstName,
                lastName:createData.lastName,
                email:createData.email,
                password:createData.password,
            }
        )
        /** @description save() methods are used to update document into a collection.
                        save() method replaces the existing document with the document
                        passed in save() method.*/                
        userData.save((err,data)=>{
            if(err){
                console.log('Error in Model :: '+err);
                
                return callback(err,null)
            }else{
                console.log('Data after save :: '+data);
                return callback(null,data);                
            }
        })
    }
}   
// deleteFromDatabase(deleteData,callback){

    //     user.findOneAndDelete({'_id':deleteData._id},(err,res)=>{
    //         if(err){
    //             return callback(err,null);
    //         }else{

    //             return callback(null,res);
    //         }
    //     })
    // }

module.exports={
    ModelClass,
    user

}