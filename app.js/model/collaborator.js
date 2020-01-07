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
 *  @since           : 07-01-2020
 *
 ******************************************************************************/

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var CollaboratorSchema=new Schema(
    {   
        userId:{
            type:Schema.Types.ObjectId,
            ref: 'User'
        },
        noteId:{
            type:Schema.Types.ObjectId,
            ref: 'Note'
        },
        collaboratorId:{
            type:Schema.Types.ObjectId,
            ref: 'User',
            default:null

        }      
 },
 {timestamps:true})
    var collaborator=mongoose.model('Collaborator',CollaboratorSchema);

    class CollaboratorClass{ 

        constructor(){

        }



        createCollaborator(){


        }

        deleteCollaborator(){

        }
    }