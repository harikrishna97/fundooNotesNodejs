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
      ref: "User",
      default: null
    },
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      default: null
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
    logger.info("controll1");
    let collaboratorData = new collaborator({
      userId: queryData.userId,
      noteId: queryData.noteId,
      collaboratorId: queryData.collaboratorId
    });
    /** @description save() methods are used to update document into a collection.
                            save() method replaces the existing document with the document
                            passed in save() method.*/

    return new Promise((resolve, reject) => {
      logger.info("........0.....");

      collaboratorData
        .save()
        .then(data => {
          logger.info("Data :: " + data);
          return resolve(data);
        })
        .catch(err => {
          logger.info("error :: " + err);
          return reject(err);
        });
    });
  }
  /**
   * @description : API to delete Note forever
   * @param {object} queryData
   */
  delete(queryData) {
    return new Promise((resolve, reject) => {
      collaborator
        .findOneAndRemove(queryData)
        .then(data => {
          logger.info('4*****************'+JSON.stringify(data))
          if (data !== null) {
            return resolve(data);
          } else {
            return reject(data);
          }
        })
        .catch(err => {
          logger.info('5ERRRR*****************',err)

          return reject(err);
        });
    });
  }

  // /**
  //  * @description : find function to find note from database
  //  * @param {object} findData
  //  */
  // findOne(queryData) {
  //   return new Promise((resolve, reject) => {
  //     collaborator
  //       .findOne(queryData)
  //       .then(data => {
  //         if (data !== null) {
  //           logger.info("DAta in find One :: ", data);
  //           return resolve(data);
  //         } else {
  //           return reject(data);
  //         }
  //       })
  //       .catch(err => {
  //         return reject(err);
  //         // logger.info("err in find One :: ", err);
  //       });
  //   });
  // }

 
}

module.exports = new CollaboratorClass();
