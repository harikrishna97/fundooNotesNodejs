

const collaboratormodel=require('../app.js/model/collaborator')

class ServiceClass{


   /**
     * @description API to add Collaborator in a given note
     * @param {object} collaboratorData 
     */
    addCollaborator(collaboratorData){
    // logger.info('collaboratorData in service'+JSON.stringify(collaboratorData));

        return new Promise((resolve,reject)=>{
            collaboratormodel.create(collaboratorData)
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
    removeCollaborator(removeData){

        return new Promise((resolve,reject)=>{
            // collaboratormodel.findOne({'noteId':removeData.noteId})
            // .then(data=>{
            //     if(data!==null){
                    collaboratormodel.delete({'_id':removeData.collaboratorId})
                    .then(data=>{
                        if(data!==null){
                            resolve(data)
                        }else{
                            reject(data)
                        }
                    }) 
                    .catch(err=>{
                        reject(err)
                    })   
                // }else{
                //     reject('invalid Id')
                // }  
            })
            .catch(err=>{
                reject(err)
            })

        // })
    }



    /**
     * @description Function to validate Mongoose Id
     * @param {*} id 
     */
    checkMongooseId(id){
        // let isValid = mongoose.Types.ObjectId.isValid(id);
        // if (!mongoose.Types.ObjectId.isValid(req.id))
        // return isValid;
        console.log('in mongoose validator');

            // coerce to string so the function can be generically used to test both strings and native objectIds created by the driver
            id = id + '';
            var len = id.length, valid = false;
            if (len == 12 || len == 24 ) {//&& isValid==true) {
              valid = /^[0-9a-fA-F]+$/.test(id);
            }
            return valid;

    }

}

module.exports=new ServiceClass;