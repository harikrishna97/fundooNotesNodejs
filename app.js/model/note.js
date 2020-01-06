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
const Schema=mongoose.Schema;

var NoteSchema=new Schema(
    {   
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
            // type:Schema.Types.ObjectId,
            // ref: 'User',
            // required:true,
            // trim:true,
        },
        email:{
            type:String,
            // required:true
        },
        remainder:{
            type:String,
            default:null
        },
        isArchive:{
            type:Boolean,
            default:false
        },
         color:{
            type:String,
            default:null
        },
        isPinned:{
            type:Boolean,
            default:false
        },
        isTrash:{
            type:Boolean,
            default:false
        },
        label:{
            type:Array,
            default:null
        },
        collaborator:{
            type:String,
            default:null
        }        
 },
 {timestamps:true})
    var note=mongoose.model('Note',NoteSchema);
    class ModelClass{   
        /**
         * @description: create to new note and save to database
         * @param {*} createData 
         */
        createNote(createData){
            let noteData=new note(
                {
                    userId:createData.userId,
                    title:createData.title,
                    description:createData.description,
                }
            )
            /** @description save() methods are used to update document into a collection.
                            save() method replaces the existing document with the document
                            passed in save() method.*/ 
            return new Promise((resolve,reject)=>{
                noteData.save().then(data=>{
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
        readNotes(findData,filterData){
            return new Promise((resolve,reject)=>{
                note.find(findData,filterData)
                .then(data=>{
                    // console.log("in found DAta",JSON.stringify(data));
                    if(data!==null){
                        resolve(data.reverse());    
                    }else{
                        // console.log(' readnotes null ',data);                       
                        reject(data);
                    }              
                })
                .catch(err=>{
                    // console.log('error in read notes :: 120',err);                  
                    reject(err)
                })
            })  
        }
        
        /**
         * @descriptioon : update Function to update Note to database
         * @param {*} updateData 
         * @param {*} dataToBeUpadted 
         */
        updateNote(updateData,dataToBeUpadted){
            console.log("===>",updateData);    
            return new Promise((resolve,reject)=>{
                console.log('In Promise');
                //useFind both Id's
                note.findByIdAndUpdate(updateData,dataToBeUpadted,{ new: true})
                .then(data=>{
                    // console.log('in data',data);  
                    if(data!=null){
                        resolve(data);
                    }else{
                        reject('invalid NoteId')
                    }                   
                })
                .catch(err=>{
                    // console.log('in err',err);   
                    reject(err)
                })
            })
        }
        /**
         * @description: Function to delete note from database 
         * @param {*} deleteData 
         */
        deleteNote(deleteData){
            return new Promise((resolve,reject)=>{
                note.findOneAndRemove(deleteData)
                .then(data=>{
                    console.log('Data in delete note',data);
                    
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
         * @description : find function to find note from database
         * @param {*} findData 
         */
        findOne(findData){
          return new Promise((resolve,reject)=>{
                note.findOne(findData)
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