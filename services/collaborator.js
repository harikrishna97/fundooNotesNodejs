const collaboratormodel = require("../app.js/model/collaborator");
const noteService = require("../app.js/model/note");
const logger = require("../config/winston");

class ServiceClass {
  /**
   * @description API to add Collaborator in a given note
   * @param {object} collaboratorData
   */
  addCollaborator(collaboratorData) {
    logger.info("collaboratorData in service");

    return new Promise((resolve, reject) => {
      collaboratormodel
        .create(collaboratorData)
        .then(data => {
          logger.info("HARI ::: main task here :: " + JSON.stringify(data));

          noteService
            .updateNote(
              { _id: data.noteId },
              { $push: { collaborator: data.collaboratorId } }
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
   * @param {object} removeData
   */
  removeCollaborator(removeData) {
    return new Promise((resolve, reject) => {
      logger.info('2*****************')
      collaboratormodel
        .delete({collaboratorId: removeData.collaboratorId })
        .then(data => {
          logger.info('3*****************',JSON.stringify(data))

          if (data !== null) {
            const idData = {};
            idData._id = data.noteId;
            // const updateData = { collaboratorId: findData.collaboratorId };

            const updateData = { $pull: { collaborator: { $in: [data.collaboratorId] } } };
                noteService
                  .updateNote(idData, updateData)
                  .then(data1 => {
                    // logger.info(' from note :: '+data1)
                    logger.info(
                      "array after upadate 2 :: " + data1.collaboratorId
                    );
                  })
                  .catch(err => {
                    logger.info("..err from note1 ::" + err);
                  });
            

            return resolve(data);
          } else {
            logger.info("data" + data);

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
   * @param {object} id
   */
  checkMongooseId(id) {
    id = id + "";
    var len = id.length,
      valid = false;
    if (len == 24) {
      valid = /^[0-9a-fA-F]+$/.test(id);
    }
    logger.info("in mongoose validator " + valid);

    return valid;
  }

  
}

module.exports = new ServiceClass();
