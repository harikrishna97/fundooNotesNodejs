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
  mongoose = require("mongoose");

class ServiceClass {
  /**
   * @description API to create Note
   * @param {*} createData
   */
  createNote(createData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .createNote(createData)
        .then(data => {
          console.log("in service");

          resolve(data);
        })
        .catch(err => {
          reject(data);
        });
    });
  }
  /**
   * @description API to get all Notes
   * @param {*} getAllNotesData
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
          { title: 1, description: 1 ,collaboratorId:1}
        )
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description API to edit Note
   * @param {*} editData
   */
  editNote(editData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .findOne({ userId: editData.userId })
        .then(data => {
          if (data !== null) {
            modelClassObject
              .updateNote(
                { _id: editData.noteId },
                { title: editData.title, description: editData.description }
              )
              .then(data => {
                console.log("null id", data);

                resolve(data);
                console.log("hfdkdhkjdd");
              })
              .catch(err => {
                reject(err);
              });
          } else {
            reject("invalid UserId");
          }
        })
        .catch(err => {
          reject(err);
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
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          reject("invalid UserId");
        }
      });
    });
  }
  /**
   * @description API to add remainder in a given note
   * @param {*} remainderData
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
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description API to remove remainder in of a given note
   * @param {*} remainderData
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
                  resolve(data);
                } else {
                  reject(data);
                }
              })
              .catch(err => {
                reject(err);
              });
          } else {
            reject("invalid UserId");
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description API to Archive a note
   * @param {*} remainderData
   */
  archiveNote(archiveData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .updateNote(
          { _id: archiveData.noteId },
          { isArchive: true, isPinned: false, isTrash: false }
        )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description API to Pinned a note
   * @param {*} remainderData
   */
  pinNote(pinNoteData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .updateNote(
          {
            _id: pinNoteData.noteId
          },
          {
            isPinned: true,
            isArchive: false,
            isTrash: false
          }
        )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description API to Trash a note
   * @param {*} remainderData
   */
  trashNote(trashNoteData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .updateNote(
          { _id: trashNoteData.noteId },
          { isTrash: true, isPinned: false, isArchive: false }
        )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description API to add schedular for Reminders
   */
  notificationServiceForRemainder() {
    // new Date() will return :: Sat Jan 04 2020 16:35:03 GMT+0530 (India Standard Time)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    // console.log(today);
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes({ remainder: today }, { title: 1, description: 1 })

        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description API to get all Archive Notes
   * @param {*} getAllArchivesData
   */
  getAllArchives(getAllArchivesData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes(
          { userId: getAllArchivesData.userId, isArchive: true },
          { title: 1, description: 1 }
        )
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description API to get all Trash Notes
   * @param {*} getAllTrashData
   */
  getAllTrashNotes(getAllTrashData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .readNotes(
          { userId: getAllTrashData.userId, isTrash: true },
          { title: 1, description: 1 }
        )
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description API to get all Pinned Notes
   * @param {*} getAllTrashData
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
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
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
      modelClassObject
        .updateNote({ _id: idData.noteId }, flagData)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description Function to validate Mongoose Id
   * @param {*} id
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
        .search(searchData)
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateNote(idData,updataeData){
return new Promise((resolve,reject)=>{
  modelClassObject.updateNote(idData,updataeData)
  .then(data => {
    console.log("null id", data);

    resolve(data);
    console.log("hfdkdhkjdd");
  })
  .catch(err => {
    reject(err);
  });

})

  }



}

module.exports = new ServiceClass();
