/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  @Purpose         : Fundoo-Notes APP  backend server
 * 
 *  @description    : Model represents domain specific data and business
 *                    logic in MVC architecture. It maintains the data of the
 *                    application. Model objects retrieve and store model state 
 *                    in the persistance store like a database. Model class holds
 *                    data in public properties. 
 *  @file              : label.js
 *  @overview      :  Model objects retrieve and store model state 
 *                    in the persistance store like a database.
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.3.0 
 *  @since           : 31-12-2019
 *
 ******************************************************************************/
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var LabelSchema=new Schema(
    {   
        
        label:{
            type:String,
            default:null
        },
        userId:{
            type:String
        }
        
 },
 {timestamps:true})
    var label=mongoose.model('Label',LabelSchema);
    class ModelClass{   

        /**
         * @description: create to new Label and save to database
         * @param {*} createData 
         */
        createLabel(createData){
            let labelData=new label(
                {
                    userId:createData.userId,
                    label:createData.label,
                    
                }
            )
            /** @description save() methods are used to update document into a collection.
                            save() method replaces the existing document with the document
                            passed in save() method.*/ 
            return new Promise((resolve,reject)=>{
                labelData.save().then(data=>{
                    resolve(data)
                })
                .catch(err=>{
                    reject(err)
                })
            })                               
        }

        /**
         * @description : read All notes From database
         */
        readLabels(){
            return new Promise((resolve,reject)=>{
                label.find().then(data=>{
                    console.log("in found DAta",JSON.stringify(data));
                resolve(data);    
                })
                .catch(err=>{
                    console.log('error in read label :: ',err);
                    
                    reject(err)
                })
            })  
        }
        
        /**
         * @descriptioon : update Function to update label to database
         * @param {*} updateData 
         * @param {*} dataToBeUpadted 
         */
        updateLabel(updateData,dataToBeUpadted){
            console.log("===>",updateData);    
            return new Promise((resolve,reject)=>{
                console.log('In Promise');
                
                label.findByIdAndUpdate(updateData,dataToBeUpadted,{ new: true})
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
         * @description: Function to delete label from database 
         * @param {*} deleteData 
         */
        deleteLabel(deleteData){
            return new Promise((resolve,reject)=>{
                label.findOneAndRemove(deleteData)
                .then(data=>{
                    console.log('Data in delete label',data);
                    
                    if(data!=null){
                        resolve(data)
                    }else if(data==null){
                        reject(data)
                    }
                   
                })
                .catch(err=>{
                    reject(err)
                })
            })   
        }
        /**
         * @description : find function to find label from database
         * @param {*} findData 
         */
        findOne(findData){
          return new Promise((resolve,reject)=>{
                label.findOne(findData)
                .then(data=>{
                    console.log('DAta in find One :: ',data);  
                    resolve(data)
                })
                .catch(err=>{
                    reject(err)
                    console.log('err in find One :: ',err);  

                })
            })
        }
        

        
    }   


    module.exports=new ModelClass;