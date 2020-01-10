const collaboratormodel = require("../app.js/model/collaborator");
const noteService = require("../app.js/model/note");
class ServiceClass {
  /**
   * @description API to add Collaborator in a given note
   * @param {object} collaboratorData
   */
  addCollaborator(collaboratorData) {
    // logger.info('collaboratorData in service'+JSON.stringify(collaboratorData));

    return new Promise((resolve, reject) => {
      collaboratormodel
        .create(collaboratorData)
        .then(data => {
          logger.info("HARI ::: main task here :: " + JSON.stringify(data));

          noteService
            .updateNote(
              { _id: data.noteId },
              { collaboratorId: data.collaboratorId }
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

    // coerce to string so the function can be generically used to test both strings and native objectIds created by the driver
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
