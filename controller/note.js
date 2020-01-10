/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  @Purpose         : Fundoo-Notes APP backend server
 * 
 *  @description    : Controllers process incoming requests, handle user input
 *                    and interactions, and execute appropriate application logic

 * 
 *  @file              : user.js
 *  @overview      :  Controllers process incoming requests, handle user input
 *                    and interactions, and execute appropriate application logic
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.5.0 
 *  @since           : 25-12-2019
 *
 ******************************************************************************/
const serviceClassObject = require("../services/note"),
  noteService = require("../services/note"),
  mongoose = require("mongoose"),
  logger = require("../config/winston");
class ControllerClass {
  /**
   * @description : API to create Note
   * @param {*} req
   * @param {*} res
   */

  createNote(req, res) {
    try {
      var errors;
      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        req.checkBody("title", "title should not be empty.").notEmpty();
        req
          .checkBody("description", "description should not be empty.")
          .notEmpty();
        errors = req.validationErrors();
        logger.info("control in ");
        var response = {};
        if (errors) {
          response.success = false;
          response.error = errors;
          return res.status(400).send(response);
        } else {
          // logger.info('REquest in Controller',req.body);

          const createNoteData = {};

          createNoteData.userId = req.decoded._id;

          // createNoteData.email=req.body.email;
          createNoteData.title = req.body.title;
          createNoteData.description = req.body.description;
          // logger.info('In Create Note',createNoteData);
          // logger.info('req.decoded.id :: ',req.decoded._id);

          const response = {};
          serviceClassObject
            .createNote(createNoteData)
            .then(data => {
              // logger.info('In Create Note data ',data);

              // resolve(data);
              response.success = true;
              response.message = "Note Successfully created";
              // response.data=data;
              return res.status(200).send(response);
            })
            .catch(err => {
              // logger.info('In Create Note data ',err);
              // reject(err);
              response.success = false;
              response.message = " Error while creating Note";
              // response.data = data;
              return res.status(400).send(response);
            });
        }
      }
    } catch (err) {
      // logger.info(err);
      const response = {};
      response.success = false;
      response.message = "create Something went Bad..";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to getallNotes from database
   * @param {*} req
   * @param {*} res
   */
  getAllNotes(req, res) {
    try {
      const getAllNotesData = {};
      getAllNotesData.userId = req.decoded._id;
      serviceClassObject
        .getAllNotes(getAllNotesData)
        .then(data => {
          logger.info("kdnjhfkjdhfdkf");
          const response = {};
          if (data == null) {
            response.success = false;
            response.error = "Invalid UserId";
            // response.data=err;
            return res.status(400).send(response);
          } else {
            response.success = true;
            // response.message='';
            response.data = data;
            return res.status(200).send(response);
          }
        })
        .catch(err => {
          const response = {};
          response.success = false;
          response.error = err;
          // response.data=err;
          return res.status(400).send(response);
        });
      // }
    } catch (err) {
      logger.error(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }

  /**
   * @description API to edit note
   * @param {*} req
   * @param {*} res
   */
  editNote(req, res) {
    try {
      let isValid = mongoose.Types.ObjectId.isValid(req.params.noteId); //true
      logger.info("mongoose validator :: ", isValid);

      if (isValid == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        req
          .checkBody("description", "description should not be empty.")
          .notEmpty();
        req.checkBody("title", "title should not be empty.").notEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
          logger.error("Validataion err");
          response.success = false;
          response.error = errors[0].msg;
          return res.status(400).send(response);
        } else {
          logger.info("Controller Data req", req.params.noteId);
          const editData = {};
          editData.userId = req.decoded._id;
          editData.noteId = req.params.noteId;
          editData.description = req.body.description;
          editData.title = req.body.title;

          logger.info("Controller Data req2", req.decoded._id);

          serviceClassObject
            .editNote(editData)
            .then(data => {
              logger.info("DAta in Controller :: edit");

              const response = {};
              response.success = true;
              response.message = "Note Successfully Updated";
              // response.data=data;
              return res.status(200).send(response);
            })
            .catch(err => {
              logger.info("err in Controller :: edit");
              // const response={}
              response.success = false;
              response.error = err;
              // response.data=err;
              return res.status(400).send(response);
            });
        }
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "edit Something went Bad..";
      return res.status(500).send(response);
    }
  }

  /**
   * @description API to remove note
   * @param {*} req
   * @param {*} res
   */
  removeNote(req, res) {
    try {
      //two more validation for  data type ,String
      // req.params('token', 'Token  should not be empty.').notEmpty();
      // req.params('noteId', 'NoteId  should not be empty.').notEmpty();
      let isValid = mongoose.Types.ObjectId.isValid(req.params.noteId); //true
      logger.info("mongoose validator :: ", isValid);

      // var errors = req.validationErrors();
      var response = {};
      if (isValid === false) {
        response.success = false;
        response.error = "invalid NoteId";
        return res.status(400).send(response);
      } else {
        // logger.info('REquest in Controller',req.body);

        const removeData = {};
        // removeData._id=req.body._id;
        removeData.userId = req.decoded._id;
        removeData.noteId = req.params.noteId;

        serviceClassObject
          .removeNote(removeData)
          .then(data => {
            logger.info("Data in remove Controller", data);

            const response = {};
            response.success = true;
            response.message = "Note Successfully deleted";
            // response.data=data;
            // resolve(data)
            return res.status(200).send(response);
          })
          .catch(err => {
            logger.info("error in EDIT Controller", err);
            const response = {};
            response.success = false;
            if (err == null) {
              response.error = "Invalid NoteId";
            } else {
              response.error = err;
            }
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "remove note Something went Bad..";
      return res.status(500).send(response);
    }
  }

  /**
   * @description API to add remainder in a note
   * @param {*} req
   * @param {*} res
   */
  addRemainder(req, res) {
    // req.checkBody('remainder', 'Remainder  should not be empty.').not().isEmpty();
    try {
      req.checkBody("remainder", "Remainder  should not be empty.").notEmpty();
      const errors = req.validationErrors();
      logger.info("control in addremainder");

      if (errors) {
        var response = {};
        response.success = false;
        response.error = errors[0].msg;
        return res.status(400).send(response);
      }
      if (
        serviceClassObject.checkMongooseId(req.params.noteId) == false ||
        serviceClassObject.checkMongooseId(req.decoded._id) == false
      ) {
        const response = {};
        response.success = false;
        response.error = "Invalid Id";
        return res.status(400).send(response);
      } else {
        // req.checkBody('remainder', 'Remainder  should have Proper Date Format.').isDate();
        const remainderData = {};
        remainderData.noteId = req.params.noteId;
        remainderData.remainder = req.body.remainder;
        const response = {};
        serviceClassObject
          .addRemainder(remainderData)
          .then(data => {
            response.success = true;
            response.message = "remainder Added successfully";
            // response.data=data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad.#.";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to delete remainder of a note
   * @param {*} req
   * @param {*} res
   */
  removeRemainder(req, res) {
    try {
      // let isValid = mongoose.Types.ObjectId.isValid(req.params.noteId);
      if (
        serviceClassObject.checkMongooseId(req.params.noteId) == false ||
        serviceClassObject.checkMongooseId(req.decoded._id) == false
      ) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        const remainderData = {};
        remainderData.noteId = req.params.noteId;
        remainderData.userId = req.decoded._id;
        const response = {};
        serviceClassObject
          .removeRemainder(remainderData)
          .then(data => {
            response.success = true;
            response.message = "remainder Deleted successfully";
            // response.data=data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = "Error while deleting";
            response.data = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to Archive note
   * @param {*} req
   * @param {*} res
   */
  archiveNote(req, res) {
    try {
      // req.checkBody('noteId', 'NoteId  should not be empty.').notEmpty();
      if (
        serviceClassObject.checkMongooseId(req.params.noteId) == false ||
        serviceClassObject.checkMongooseId(req.decoded._id) == false
      ) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        const archiveData = {};
        archiveData.noteId = req.params.noteId;

        const response = {};
        serviceClassObject
          .archiveNote(archiveData)
          .then(data => {
            response.success = true;
            response.message = "Note Archive successfully";
            // response.data=data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = "Error while Archiving Note";
            response.data = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }

  /**
   * @description API to Pin a note
   * @param {*} req
   * @param {*} res
   */
  pinNote(req, res) {
    try {
      //    req.checkBody('noteId', 'NoteId  should not be empty.').notEmpty();
      if (
        serviceClassObject.checkMongooseId(req.params.noteId) == false ||
        serviceClassObject.checkMongooseId(req.decoded._id) == false
      ) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        const pinNoteData = {};
        pinNoteData.noteId = req.params.noteId;

        const response = {};
        serviceClassObject
          .pinNote(pinNoteData)
          .then(data => {
            response.success = true;
            response.message = "Note Pinned successfully";
            // response.data=data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = "Error while Pinning Note";
            response.data = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to Trash a note
   * @param {*} req
   * @param {*} res
   */
  trashNote(req, res) {
    try {
      // req.checkBody('noteId', 'NoteId  should not be empty.').notEmpty();
      if (
        serviceClassObject.checkMongooseId(req.params.noteId) == false ||
        serviceClassObject.checkMongooseId(req.decoded._id) == false
      ) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        const trashNoteData = {};
        trashNoteData.noteId = req.params.noteId;

        const response = {};
        serviceClassObject
          .trashNote(trashNoteData)
          .then(data => {
            response.success = true;
            response.message = "Note Trash successfully";
            // response.data=data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = "Error while Trashing a Note";
            response.data = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to get All Archive notes from database
   * @param {*} req
   * @param {*} res
   */
  getAllArchives(req, res) {
    try {
      logger.info(req.decoded);

      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid UserId";
        return res.status(400).send(response);
      } else {
        // return res.status(500).send('error');

        const getAllArchivesData = {};
        getAllArchivesData.userId = req.decoded._id;
        serviceClassObject
          .getAllArchives(getAllArchivesData)
          .then(data => {
            const response = {};
            if (data == null) {
              response.success = false;
              response.error = "Invalid UserId";
              // response.data=err;
              return res.status(400).send(response);
            } else {
              response.success = true;
              // response.message='';
              response.data = data;
              return res.status(200).send(response);
            }
          })
          .catch(err => {
            const response = {};
            response.success = false;
            response.error = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to get All Trash notes from database
   * @param {*} req
   * @param {*} res
   */
  getAllTrashNotes(req, res) {
    try {
      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid UserId";
        return res.status(400).send(response);
      } else {
        const getAllArchivesData = {};
        getAllArchivesData.userId = req.decoded._id;
        serviceClassObject
          .getAllTrashNotes(getAllArchivesData)
          .then(data => {
            const response = {};
            if (data == null) {
              response.success = false;
              response.error = "Invalid UserId";
              // response.data=err;
              return res.status(400).send(response);
            } else {
              response.success = true;
              // response.message='';
              response.data = data;
              return res.status(200).send(response);
            }
          })
          .catch(err => {
            const response = {};
            response.success = false;
            response.error = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to get All Pinned notes from database
   * @param {*} req
   * @param {*} res
   */
  getAllPinnedNotes(req, res) {
    try {
      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid UserId";
        return res.status(400).send(response);
      } else {
        const getAllArchivesData = {};
        getAllArchivesData.userId = req.decoded._id;
        serviceClassObject
          .getAllPinnedNotes(getAllArchivesData)
          .then(data => {
            const response = {};
            if (data == null) {
              response.success = false;
              response.error = "Invalid UserId";
              // response.data=err;
              return res.status(400).send(response);
            } else {
              response.success = true;
              // response.message='';
              response.data = data;
              return res.status(200).send(response);
            }
          })
          .catch(err => {
            const response = {};
            response.success = false;
            response.error = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }

  /**
   * @description API to getallNotes from database
   * @param {*} req
   * @param {*} res
   */
  search(req, res) {
    try {
      logger.info(req.body);

      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        const searchData = {};
        searchData.userId = req.decoded._id;
        searchData.searchKey = req.params.searchKey;
        noteService
          .search(searchData)
          .then(data => {
            logger.info("1111111111111111");
            const response = {};
            if (data == null) {
              response.success = false;
              response.error = "Invalid UserId";
              // response.data=err;
              return res.status(400).send(response);
            } else {
              response.success = true;
              // response.message='';
              response.data = data;
              return res.status(200).send(response);
            }
          })
          .catch(err => {
            logger.info(".............");

            const response = {};
            response.success = false;
            response.error = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.error(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }

  /**
   * @description  Common API to Update flag like isTrash,isPinned,isArchive,
   *               color with value true/false/color
   * @param {*} req
   * @param {*} res
   */
  updateFlag(req, res) {
    req.checkBody("flagValue", "Data  should not be empty.").notEmpty();
    if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
      const response = {};
      response.success = false;
      response.error = "Invalid NoteId";
      return res.status(400).send(response);
    } else {
      const updateData = {};
      const idObjectData = {};
      idObjectData.noteId = req.params.noteId;
      idObjectData.userId = req.decoded._id;

      switch (req.params.flag) {
        case "pin":
          {
            if (req.body.flagValue == true) {
              updateData.isPinned = true;
              updateData.isArchive = false;
              updateData.isTrash = false;
            } else {
              updateData.isPinned = false;
              updateData.isArchive = false;
              updateData.isTrash = false;
            }
          }
          // code block
          break;
        case "trash":
          {
            if (req.params.flag == "trash") {
              if (req.body.flagValue === true) {
                updateData.isTrash = true;
                updateData.isPinned = false;
                updateData.isArchive = false;
              }
            }
          }
          // code block
          break;
        case "archive":
          {
            if (req.body.flagValue === true) {
              updateData.isTrash = false;
              updateData.isPinned = false;
              updateData.isArchive = true;
            } else {
              updateData.isArchive = false;
              updateData.isTrash = false;
              updateData.isPinned = false;
            }
          }
          // code block
          break;
        case "color":
          updateData.color = req.body.flagValue;
          // code block
          break;
      }

      const response = {};
      logger.info("updateData :: " + JSON.stringify(updateData), null, "\n");
      serviceClassObject
        .updateFlag(idObjectData, updateData)
        .then(data => {
          response.success = true;
          response.message = "Note updated successfully";
          response.data = data;
          return res.status(200).send(response);
        })
        .catch(err => {
          response.success = false;
          response.error = "Error while updating a Note";
          response.data = err;
          // response.data=err;
          return res.status(400).send(response);
        });
    }
  }

  updateNote(req, res) {
    const response = {};
    try {
      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        logger.info("hari");
        const idData = {};
        const updateData = {};
        idData._id = req.params.noteId;
        
        if (req.body.title !== undefined) {
          updateData.title = req.body.title;
        }

        if (req.body.description !== undefined) {
          updateData.description = req.body.description;
        }

        serviceClassObject
          .updateNote(idData, updateData)
          .then(data => {
            logger.info("DAta in Controller :: edit");

            response.success = true;
            response.message = "Note Successfully Updated";
            response.data = data;
            return res.status(200).send(response);
          })
          .catch(err => {
            logger.info("err in Controller :: edit");
            // const response={}
            response.success = false;
            response.error = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
}

module.exports = new ControllerClass();
