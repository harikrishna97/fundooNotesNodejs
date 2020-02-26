/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  @Purpose         : Fundoo-Notes APP backend server
 * 
 *  @description    : The service layer contains business logic.
 *                    In particular, it contains validation logic 

 * 
 *  @file              : user.service.js
 *  @overview      :  The service layer contains business logic.
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.10.0 
 *  @since           : 18-12-2019
 *
 ******************************************************************************/

const modelClassObject = require("../app.js/model/note"),
  // cron = require("node-cron"),
  nodeMailer = require("../utility/sendMail"),
  // nodeMailerObject=new nodeMailer.NodeMailerClass,
  logger = require("../config/winston"),
  mongoose = require("mongoose");

class ServiceClass {
  /**
   * @description API to create Note
   * @param {object} createData
   */
  createNote(createData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .createNote(createData)
        .then(data => {
          console.log("in service" + data);

          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
  /**
   * @description API to get all Notes
   * @param {object} getAllNotesData
   */
  getAllNotes(getAllNotesData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes(
          {
            userId: getAllNotesData.userId,
            isTrash: false,
            isArchive: false,
            isPinned: false
          },
          {
            title: 1,
            description: 1,
            color: 1,
            label: 1,
            remainder: 1,
            collaborator: 1
          }
        )
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
    });
  }

  /**
   * @description API to get all Labeled  Notes
   * @param {object} getAllNotesData
   */
  getAllLabeledNotes(getAllLabeledNotesData) {
    return new Promise((resolve, reject) => {
      const id = new mongoose.Schema.Types.ObjectId(getAllLabeledNotesData.labelId);
      logger.info("Id is------> " + id);
      // db.collection.find({
      //   unusual: {
      //     $elemMatch: { defindex: 363, _particleEffect: { $in: [6, 19] } }
      //   }
      // });$all:[{"defindex":{"$in":[361,378]}}
    //   "unusual":  { 
    //     $all:[{
    //         $elemMatch:{"defindex":313},
    //         $elemMatch:{"_particleEffect":6}
    //     }]
    // }

      modelClassObject
        .readNotes({},
          {
            userId: getAllLabeledNotesData.userId,
            label:{$elemMatch:{$eq:ObjectId("5e3d5cfd1054a66fefb1248d")}}
          },
          
          // {
          //   title: 1,
          //   description: 1,
          //   color: 1,
          //   label: 1,
          //   remainder: 1,
          //   collaborator: 1
          // }
        )
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
    });
  }

  /**
   * @description API to remove Note
   * @param {object} removeNote
   */
  removeNote(removeNote) {
    return new Promise((resolve, reject) => {
      // const deleteData={'noteId':removeNote._id}
      //call find method here and then update note
      modelClassObject.findOne({ userId: removeNote.userId }).then(data => {
        if (data !== null) {
          modelClassObject
            .updateNote({ _id: removeNote.noteId }, { isTrash: true })
            .then(data => {
              return resolve(data);
            })
            .catch(err => {
              return reject(err);
            });
        } else {
          reject("invalid UserId");
        }
      });
    });
  }
  /**
   * @description API to add remainder in a given note
   * @param {object} remainderData
   */
  addRemainder(remainderData) {
    console.log("Remainder Date in service", JSON.stringify(remainderData));

    return new Promise((resolve, reject) => {
      modelClassObject
        .updateNote(
          { _id: remainderData.noteId },
          { remainder: remainderData.remainder }
        )
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
  /**
   * @description API to remove remainder in of a given note
   * @param {object} remainderData
   */
  removeRemainder(remainderData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .findOne({ userId: remainderData.userId })
        .then(data => {
          if (data !== null) {
            modelClassObject
              .updateNote({ _id: remainderData.noteId }, { remainder: null })
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
          } else {
            reject("invalid UserId");
          }
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description API to get all Archive Notes
   * @param {object} getAllRemaindersData
   */
  getAllRemainders(getAllRemaindersData) {
    return new Promise((resolve, reject) => {
      // const data={}
      // data.remainder= null;
      modelClassObject
        .readNotes(
          {
            userId: getAllRemaindersData.userId,
            remainder: { $nin: [null, ""] }
          },
          { title: 1, description: 1, color: 1, remainder: 1 }
        )
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
    });
  }

  /**
   * @description API to get all Archive Notes
   * @param {object} getAllArchivesData
   */
  getAllArchives(getAllArchivesData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes(
          { userId: getAllArchivesData.userId, isArchive: true },
          { title: 1, description: 1, color: 1, label: 1, remainder: 1 }
        )
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
    });
  }

  /**
   * @description API to get all Trash Notes
   * @param {object} getAllTrashData
   */
  getAllTrashNotes(getAllTrashData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes(
          { userId: getAllTrashData.userId, isTrash: true },
          { title: 1, description: 1, color: 1, label: 1, remainder: 1 }
        )
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
    });
  }

  /**
   * @description API to get all Pinned Notes
   * @param {object} getAllTrashData
   */
  getAllPinnedNotes(getAllTrashData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes(
          { userId: getAllTrashData.userId, isPinned: true },
          { title: 1, description: 1 }
        )
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
    });
  }

  /**
   * @description API to upadate flag value a note
   * @param {object} idData
   * @param {object} flagData
   */
  updateFlag(idData, flagData) {
    return new Promise((resolve, reject) => {
      logger.info("colordfdf");
      modelClassObject
        .updateNote({ _id: idData.noteId }, flagData)
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description Function to validate Mongoose Id
   * @param {object} id
   */
  checkMongooseId(id) {
    // coerce to string so the function can be generically used to test both strings and native objectIds created by the driver
    id = id + "";
    var len = id.length,
      valid = false;
    if (len == 12 || len == 24) {
      valid = /^[0-9a-fA-F]+$/.test(id);
    }
    return valid;
  }

  /**
   * @description search API to get all Notes by any key
   * @param {object} searchData
   */
  search(searchData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .search(searchData, {
          title: 1,
          description: 1,
          color: 1,
          label: 1,
          remainder: 1
        })
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
    });
  }

  updateNote(idData, updataeData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .updateNote(idData, updataeData)
        .then(data => {
          console.log("null id", data);

          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

module.exports = new ServiceClass();
