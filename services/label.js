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

const modelClassObject=require('../app.js/model/label')


class ServiceClass {
    /**
     * 
     * @param {*} createData 
     */
    createLabelInService(createData){
        return new Promise((resolve,reject)=>{
            modelClassObject.createLabel(createData)
            .then(data=>{
                console.log('in service');
                
                resolve(data);
            })
            .catch(err=>{
                reject(data);
            })

        })
        

    }

    getAllLabelsInService(){
        return new Promise((resolve,reject)=>{
            // const readNotesData={'eamil':getAllNoteData.email}
            modelClassObject.readLabels()
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    

    editLabelInService(editData){
        return new Promise((resolve,reject)=>{

            
                modelClassObject.updateLabel({'_id':editData.labelId},{'label':editData.label})
                .then(data=>{
                    resolve(data)
                })
                .catch(err=>{
                    reject(err)
                })
            
            
                // const updatedata={'_id':editData._id}
                // const dataToBeUpdated={'title':editData.title,'description':editData.description}
                
        })
    }
    /**
     * @description API to remove Label from database
     * @param {*} removeLabel 
     */
    removeLabelInService(removeLabel){
        return new Promise((resolve,reject)=>{
            const deleteData={'_id':removeLabel.labelId}
            
            modelClassObject.deleteLabel(deleteData)
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