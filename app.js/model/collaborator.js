/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js
 *                      2. if nodemon installed   cmd> nodemon server.js
 *
 *  @Purpose         : Fundoo-Notes APP  backend server
 *
 *  @description    : Model represents domain specific data and business
 *                    logic in MVC architecture. It maintains the data of the
 *                    application. Model objects retrieve and store model state
 *                    in the persistance store like a database. Model class holds
 *                    data in public properties.
 *  @file              : user.js
 *  @overview      :  Model objects retrieve and store model state
 *                    in the persistance store like a database.
 *  @module        :
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.3.0
 *  @since           : 07-01-2020
 *
 ******************************************************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const logger = require("../../config/winston");
var CollaboratorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note"
    },
    collaboratorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);
const collaborator = mongoose.model("Collaborator", CollaboratorSchema);

class CollaboratorClass {
  constructor() {}

  create(queryData) {
    let collaboratorData = new collaborator({
      userId: queryData.userId,
      noteId: queryData.noteId,
      collaboratorId: queryData.collaboratorId
    });
    /** @description save() methods are used to update document into a collection.
                            save() method replaces the existing document with the document
                            passed in save() method.*/

    return new Promise((resolve, reject) => {
      console.log("........0.....");

      collaboratorData
        .save()
        .then(data => {
          logger.info("Data :: " + data);
          resolve(data);
        })
        .catch(err => {
          logger.info("error :: " + err);
          reject(err);
        });
    });
  }

  delete(queryData) {
    return new Promise((resolve, reject) => {
      collaborator
        .findOneAndDelete(queryData)
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
   * @description : find function to find note from database
   * @param {*} findData
   */
  findOne(queryData) {
    return new Promise((resolve, reject) => {
      note
        .findOne(queryData)
        .then(data => {
          if (data !== null) {
            console.log("DAta in find One :: ", data);
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
          console.log("err in find One :: ", err);
        });
    });
  }
}

module.exports = new CollaboratorClass();
