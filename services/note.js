const modelClassObject=require('../app.js/model/note')


class ServiceClass {

    createNoteInService(createData){
        return new Promise((resolve,reject)=>{
            modelClassObject.createNote(createData)
            .then(data=>{
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

    // editNoteInService(editData){
    //     return new Promise((resolve,reject)=>{
    //         const updatedata={'userId':editData.userId}
    //         const dataToBeUpdated={'title':editData.title,'content':editData.content}
    //         modelClassObject.updateNote(updatedata,dataToBeUpdated)
    //         .then(data=>{
    //             resolve(data)
    //         })
    //         .catch(err=>{
    //             reject(err)
    //         })
    //     })

    // }

    // removeNoteInService(removeNote){
    //     return new Promise((resolve,reject)=>{
    //         const deleteData={'userId':removeNote.userId}
            
    //         modelClassObject.deleteNote(deleteData)
    //         .then(data=>{
    //             resolve(data)
    //         })
    //         .catch(err=>{
    //             reject(err)
    //         })
    //     })

    // }


}

module.exports=new ServiceClass;