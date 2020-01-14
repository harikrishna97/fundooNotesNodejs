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
              { $push: { collaboratorId: data.collaboratorId } }
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
            const idData = {};
            idData._id = data.noteId;
            noteService
              .findOne(idData)
              .then(findData => {
                logger.info('findData :: '+findData.collaboratorId)
                // "--"+findData.collaboratorId.length+'--'+data.collaboratorId)
                const array = [];
                const collaboratorId = findData.collaboratorId;
                // for(let i=0;i<collaboratorId.length;i++){
                //   array.push(collaboratorId[i])

                // }
                logger.info("Array before splice :: " + findData.collaboratorId);
                const index = findData.collaboratorId.indexOf(
                  data.collaboratorId
                );
                console.log("index 63: ", index);

                if (index > -1) {
                  console.log("index 64: ", index);

                  array.splice(index, 1);
                }
                logger.info("array after splice  1 " + findData.collaboratorId);

                const updateData = { collaboratorId: findData.collaboratorId };
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
              })
              .catch(err => {
                logger.info("..err from note2 ::" + err);
              });

            return resolve(data);
          } else {
            console.log("data", data);

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
