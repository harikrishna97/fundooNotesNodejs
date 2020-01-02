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

const modelClassObject=require('../app.js/model/note')


class ServiceClass {
    /**
     * 
     * @param {*} createData 
     */
    createNote(createData){
        return new Promise((resolve,reject)=>{
            modelClassObject.createNote(createData)
            .then(data=>{
                console.log('in service');
                
                resolve(data);
            })
            .catch(err=>{
                reject(data);
            })

        })
        

    }

    getAllNotes(getAllNotesData){
        return new Promise((resolve,reject)=>{
            // const readNotesData={'eamil':getAllNoteData.email}
            modelClassObject.readNotes({'userId':getAllNotesData.userId})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    

    editNote(editData){
        return new Promise((resolve,reject)=>{

            // modelClassObject.findOne({'_id':editData._id})
            // .then(data=>{
                modelClassObject.updateNote({'userId':editData.userId,'noteIs':editData.noteId},{'title':editData.title,'description':editData.description})
                .then(data=>{
                    resolve(data)
                })
                .catch(err=>{
                    reject(err)
                })
            // })
            // .catch(err=>{
                // reject(err)
            // })
                // const updatedata={'_id':editData._id}
                // const dataToBeUpdated={'title':editData.title,'description':editData.description}
                
        })
    }
    /**
     * 
     * @param {*} removeNote 
     */
    removeNote(removeNote){
        return new Promise((resolve,reject)=>{
            const deleteData={'noteId':removeNote._id}
            //call find method here and then update note
            modelClassObject.updateNote({'noteId':removeNote.noteId},{'isTrash':true})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
        })

    }
    /**
     * @description API to add remainder in a given note
     * @param {*} remainderData 
     */
    addRemainderInService(remainderData){
    console.log('Remainder Dat in service',JSON.stringify(remainderData));

        return new Promise((resolve,reject)=>{
            modelClassObject.updateNote({'_id': remainderData.noteId},{'remainder':remainderData.remainder})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
    /**
     * @description API to remove remainder in of a given note
     * @param {*} remainderData 
     */
    removeRemainderInService(remainderData){

        return new Promise((resolve,reject)=>{
            modelClassObject.updateNote({'_id':remainderData.noteId},{'remainder':null})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })

        })
    }

    /**
     * @description API to Archive a note
     * @param {*} remainderData 
     */
    archiveNoteInService(archiveData){

        return new Promise((resolve,reject)=>{
            modelClassObject.updateNote({'_id':archiveData.noteId},{'isArchive':true})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })

        })
    }

    /**
     * @description API to Remove Archived note
     * @param {*} remainderData 
     */
    removeArchiveNoteInService(archiveData){

        return new Promise((resolve,reject)=>{
            modelClassObject.updateNote({'_id':archiveData.noteId},{'isArchive':false})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })

        })
    }
    /**
     * @description API to Pinned a note
     * @param {*} remainderData 
     */
    pinNoteInService(pinNoteData){
        return new Promise((resolve,reject)=>{
            modelClassObject.updateNote({'_id':pinNoteData.noteId},{'isPinned':true})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })

        })
    }
    /**
     * @description API to Trash a note
     * @param {*} remainderData 
     */
    trashNoteInService(trashNoteData){
        return new Promise((resolve,reject)=>{
            modelClassObject.updateNote({'_id':trashNoteData.noteId},{'isTrash':true})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })

        })

    }
}

module.exports=new ServiceClass;
