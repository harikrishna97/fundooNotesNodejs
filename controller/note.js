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
   * @param {object} req
   * @param {object} res
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
          const createNoteData = {};

          createNoteData.userId = req.decoded._id;

          // createNoteData.email=req.body.email;
          createNoteData.title = req.body.title;
          createNoteData.description = req.body.description;
          createNoteData.color = req.body.color;
          createNoteData.remainder = req.body.remainder;
          createNoteData.isArchive = req.body.isArchive;
          createNoteData.isTrash = req.body.isTrash;

          logger.info("In Create Note", createNoteData);
          logger.info("req.decoded.id :: ", req.decoded._id);

          const response = {};
          serviceClassObject
            .createNote(createNoteData)
            .then(data => {
              logger.info("In Create Note data1" + data);

              // resolve(data);
              response.success = true;
              response.message = "Note Successfully created";
              response.data=data;
              // response.data=data;
              return res.status(200).send(response);
            })
            .catch(err => {
              logger.info("In Create Note data " + err);
              // reject(err);
              response.success = false;
              response.message = " Error while creating Note";
              response.error = err;
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
   * @param {object} req
   * @param {object} res
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
   * @description API to getall Labeled Notes from database
   * @param {object} req
   * @param {object} res
   */
  getAllLabeledNotes(req, res) {
    try {

      if (serviceClassObject.checkMongooseId(req.decoded._id) == false||
      serviceClassObject.checkMongooseId(req.params.labelId) == false
      ) {
        const response = {};
        response.success = false;
        response.error = "Invalid UserId";
        return res.status(400).send(response);
      } else {
      const getAllLabeledNotesData = {};
      getAllLabeledNotesData.userId = req.decoded._id;
      getAllLabeledNotesData.labelId = req.params.labelId;
      serviceClassObject
        .getAllLabeledNotes(getAllLabeledNotesData)
        .then(data => {
          logger.info("Labeled ");
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
      logger.error(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..",err;
      return res.status(500).send(response);
    }
  }






  /**
   * @description API to remove note
   * @param {object} req
   * @param {object} res
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
   * @param {object} req
   * @param {object} res
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
   * @param {object} req
   * @param {object} res
   */
  removeRemainder(req, res) {
    try {
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
            response.data = data;
            console.log("Reminder Delete", response);
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
   * @description API to get All remainders notes from database
   * @param {object} req
   * @param {object} res
   */
  getAllRemainders(req, res) {
    try {
      // logger.info(req.decoded);

      if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
        const response = {};
        response.success = false;
        response.error = "Invalid UserId";
        return res.status(400).send(response);
      } else {
        // return res.status(500).send('error');

        const getAllRemaindersData = {};
        getAllRemaindersData.userId = req.decoded._id;
        serviceClassObject
          .getAllRemainders(getAllRemaindersData)
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
   * @description API to get All Archive notes from database
   * @param {object} req
   * @param {object} res
   */
  getAllArchives(req, res) {
    try {
      // logger.info(req.decoded);

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
   * @param {object} req
   * @param {object} res
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
   * @param {object} req
   * @param {object} res
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
   * @param {object} req
   * @param {object} res
   */
  search(req, res) {
    logger.info(".....Im in search........");
    try {
      if (
        req.params.searchKey === undefined ||
        req.params.searchKey === null ||
        req.params.searchKey === ""
      ) {
        throw "Search Key is required..";
      }

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
            logger.info("1111111111111111", data);
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
      response.message = err;
      return res.status(500).send(response);
    }
  }

  /**
   * @description  Common API to Update flag like isTrash,isPinned,isArchive,
   *               color with value true/false/color
   * @param {object} req
   * @param {object} res
   */
  updateFlag(req, res) {
    // console.log("restore1",req);

    req.checkBody("flagValue", "Data  should not be empty.").notEmpty();
    if (serviceClassObject.checkMongooseId(req.decoded._id) == false) {
      console.log("restore2");

      const response = {};
      response.success = false;
      response.error = "Invalid NoteId";
      return res.status(400).send(response);
    } else {
      // console.log("restore");

      var updateData = {};
      const idObjectData = {};
      idObjectData.noteId = req.params.noteId;
      // idObjectData.userId = req.decoded._id;

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
              } else {
                updateData.isTrash = false;
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
          logger.info("color is " + req.body.flagValue);
          updateData.color = req.body.flagValue;
          // code block
          break;

        case "label":
          logger.info("label is " + req.body.flagValue);
          updateData = { $push: { label: req.body.flagValue } };
          break;

        case "del_label":
          logger.info("delete label is " + req.body.flagValue);
          updateData = { $pull: { label: { $in: [req.body.flagValue] } } };
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

        if (req.body.color !== undefined) {
          updateData.color = req.body.color;
        }
        if (req.body.remainder !== undefined) {
          updateData.remainder = req.body.remainder;
        }
        if (req.body.isTrash !== undefined) {
          updateData.isTrash = req.body.isTrash;
        }
        if (req.body.isArchive !== undefined) {
          updateData.isArchive = req.body.isArchive;
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
