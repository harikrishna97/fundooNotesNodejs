const collaboratormodel = require("../app.js/model/collaborator");
const noteService = require("../app.js/model/note");
const logger = require("../config/winston");

class ServiceClass {
  /**
   * @description API to add Collaborator in a given note
   * @param {object} collaboratorData
   */
  addCollaborator(collaboratorData) {
    logger.info('collaboratorData in service');

    return new Promise((resolve, reject) => {
      collaboratormodel
        .create(collaboratorData)
        .then(data => {
          logger.info("HARI ::: main task here :: " + JSON.stringify(data));

          noteService
            .updateNote(
              { _id: data.noteId },
              { $push:{collaboratorId: data.collaboratorId }}
            )
            .then(data1 => {
              logger.info("data from note " + data1);

              return resolve(data);
            });
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description API to remove collaborator in of a given note
   * @param {*} removeData
   */
  removeCollaborator(removeData) {
    return new Promise((resolve, reject) => {
      // collaboratormodel.findOne({'noteId':removeData.noteId})
      // .then(data=>{
      //     if(data!==null){
      collaboratormodel
        .delete({ _id: removeData.collaboratorId })
        .then(data => {
          if (data !== null) {
            const idData={}
            idData._id=data.noteId;
            const updateData={$push:{'collaboratorId':null}}
            noteService.updateNote(idData,updateData)
            .then(data1=>{
              logger.info(' '+data1)
            })
            .catch(err=>{
              logger.info('...'+err);
            })
            return resolve(data);
          } else {
            return reject(data);
          }
        })
        .catch(err => {
          return reject(err);
        });
      // }else{
      //     reject('invalid Id')
      // }
    }).catch(err => {
      return reject(err);
    });

    // })
  }

  /**
   * @description Function to validate Mongoose Id
   * @param {*} id
   */
  checkMongooseId(id) {
    logger.info("in mongoose validator");
    id = id + "";
    var len = id.length,
      valid = false;
    if (len == 12 || len == 24) {
      //&& isValid==true) {
      valid = /^[0-9a-fA-F]+$/.test(id);
    }
    return valid;
  }
}

module.exports = new ServiceClass();
