const modelClassObject=require('../app.js/model/note')


class ServiceClass {

    createNoteInService(createData){
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

    getAllNotesInService({}){
        return new Promise((resolve,reject)=>{
            modelClassObject.readNotes({})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    // getAllNotesByIdInService(getAllNoteData){
    //     return new Promise((resolve,reject)=>{
    //         modelClassObject.findAllNotesById({'userId':getAllNoteData.userId})
    //         .then(data=>{
    //             resolve(data)
    //         })
    //         .catch(err=>{
    //             reject(err)
    //         })
    //     })
    // }

    editNoteInService(editData){
        return new Promise((resolve,reject)=>{

            modelClassObject.findOne({'_id':editData._id})
            .then(data=>{
                modelClassObject.updateNote({'_id':editData._id},{'title':editData.title,'description':editData.description})
                .then(data=>{
                    resolve(data)
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{
                reject(err)
            })
                // const updatedata={'_id':editData._id}
                // const dataToBeUpdated={'title':editData.title,'description':editData.description}
                
        })

    }

    removeNoteInService(removeNote){
        return new Promise((resolve,reject)=>{
            const deleteData={'_id':removeNote._id}
            
            modelClassObject.deleteNote(deleteData)
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