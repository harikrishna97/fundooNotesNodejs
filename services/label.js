/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : Fundoo-Notes APP backend server
 * 
 *  @description    : The service layer contains business logic.
 *                    In particular, it contains validation logic 

 * 
 *  @file              : user.service.js
 *  @overview      :  The service layer contains business logic.
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 18-12-2019
 *
 ******************************************************************************/

const modelClassObject = require("../app.js/model/label");
const logger = require("../config/winston");
class ServiceClass {
  /**
   * @description create Label API
   * @param {object} createData
   */
  createLabel(createData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .createLabel(createData)
        .then(data => {
          logger.info("in service");

          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description getall Label API
   *
   */
  getAllLabels(getAllLabelsData) {
    return new Promise((resolve, reject) => {
      // const readNotesData={'eamil':getAllNoteData.email}
      modelClassObject
        .readLabels(getAllLabelsData)
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @description create Label API
   * @param {object} editData
   */
  editLabel(editData) {
    return new Promise((resolve, reject) => {
      modelClassObject
        .updateLabel({ _id: editData.labelId }, { label: editData.label })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });

      // const updatedata={'_id':editData._id}
      // const dataToBeUpdated={'title':editData.title,'description':editData.description}
    });
  }

  /**
   * @description API to remove Label from database
   * @param {object} removeLabel
   */
  removeLabel(removeLabel) {
    return new Promise((resolve, reject) => {
      const deleteData = { _id: removeLabel.labelId };

      modelClassObject
        .deleteLabel(deleteData)
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

module.exports = new ServiceClass();
