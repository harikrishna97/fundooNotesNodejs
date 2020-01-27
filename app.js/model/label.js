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
 *  @file              : label.js
 *  @overview      :  Model objects retrieve and store model state
 *                    in the persistance store like a database.
 *  @module        :
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.3.0
 *  @since           : 31-12-2019
 *
 ******************************************************************************/
const mongoose = require("mongoose");
const logger = require("../../config/winston");
const Schema = mongoose.Schema;

var LabelSchema = new Schema(
  {
    label: {
      type: String,
      default: null
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);
var label = mongoose.model("Label", LabelSchema);
class ModelClass {
  /**
   * @description: create to new Label and save to database
   * @param {object} createData
   */
  createLabel(createData) {
    let labelData = new label({
      userId: createData.userId,
      label: createData.label
    });
    /** @description save() methods are used to update document into a collection.
                            save() method replaces the existing document with the document
                            passed in save() method.*/

    return new Promise((resolve, reject) => {
      labelData
        .save()
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description : read All notes From database
   */
  readLabels() {
    return new Promise((resolve, reject) => {
      label
        .find()
        .then(data => {
          logger.info("in found DAta", JSON.stringify(data));
          return resolve(data);
        })
        .catch(err => {
          logger.info("error in read label :: ", err);

          return reject(err);
        });
    });
  }

  /**
   * @descriptioon : update Function to update label to database
   * @param {object} updateData
   * @param {object} dataToBeUpadted
   */
  updateLabel(updateData, dataToBeUpadted) {
    logger.info("===>", updateData);
    return new Promise((resolve, reject) => {
      logger.info("In Promise");

      label
        .findByIdAndUpdate(updateData, dataToBeUpadted, { new: true })
        .then(data => {
          logger.info("in data");
          return resolve(data);
        })
        .catch(err => {
          logger.info("in err", err);
          return reject(err);
        });
    });
  }

  /**
   * @description: Function to delete label from database
   * @param {object} deleteData
   */
  deleteLabel(deleteData) {
    return new Promise((resolve, reject) => {
      label
        .findOneAndRemove(deleteData)
        .then(data => {
          logger.info("Data in delete label", data);

          if (data != null) {
            return resolve(data);
          } else if (data == null) {
            return reject(data);
          }
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description : find function to find label from database
   * @param {object} findData
   */
  findOne(findData) {
    return new Promise((resolve, reject) => {
      label
        .findOne(findData)
        .then(data => {
          logger.info("DAta in find One :: ", data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
          logger.info("err in find One :: ", err);
        });
    });
  }
}

module.exports = new ModelClass();
