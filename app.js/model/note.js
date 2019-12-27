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
            type:Schema.Types.ObjectId,
            ref: 'User',
            // required:true,
            // trim:true,
        },
        email:{
            type:String
        },
        remainder:{
            type:Date
        },
        isArchive:{
            type:Boolean
        },
         color:{
            type:String,

        },
        isPinned:{
            type:Boolean

        },
        isTrash:{
            type:Boolean
        },
        label:{
            type:Array
        },
        collaborator:{
            type:String
        }
        // // noteId:{
        // //     type:String,
        // //     required:true,
        // //     trim:true
        // // },

       
        // image:{
        //     type:String
            
        // },
        
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
                    email:createData.email,
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
        readNotes(){
            return new Promise((resolve,reject)=>{
                note.find({}).then(data=>{
                    console.log("in found DAta",data);
                resolve(data);    
                })
                .catch(err=>{
                    console.log('error in read notes :: 86',err);
                    
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
            // console.log("===>",updateData);    
            return new Promise((resolve,reject)=>{
                note.findByIdAndUpdate(updateData,dataToBeUpadted,{ new: true})
                .then(data=>{
                    // console.log('in data');  
                    resolve(data);
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
                    resolve(data)
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